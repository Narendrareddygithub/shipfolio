import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { projectUpdates, projects } from '@/lib/db/schema';
import { eq, desc, and } from 'drizzle-orm';
import { uploadMedia } from '@/lib/cloudinary/client';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const guestId = req.cookies.get('shipfolio_guest_id')?.value;

    if (!guestId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const updates = await db
      .select()
      .from(projectUpdates)
      .where(eq(projectUpdates.projectId, id))
      .orderBy(desc(projectUpdates.createdAt));

    return NextResponse.json({ updates });
  } catch (error) {
    console.error('Failed to fetch updates:', error);
    return NextResponse.json({ error: 'Failed to fetch updates' }, { status: 500 });
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const guestId = req.cookies.get('shipfolio_guest_id')?.value;

    if (!guestId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Verify project belongs to user
    const [project] = await db
      .select()
      .from(projects)
      .where(and(eq(projects.id, id), eq(projects.userId, guestId)));

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    const contentType = req.headers.get('content-type') || '';
    let content = '';
    let updateType = 'feature';
    let mediaUrls: string[] = [];

    if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData();
      content = (formData.get('content') as string) || '';
      updateType = (formData.get('updateType') as string) || 'feature';

      const files = formData.getAll('media') as File[];
      for (const file of files) {
        if (file && file.size > 0) {
          const buffer = Buffer.from(await file.arrayBuffer());
          const uploadResult = await uploadMedia(buffer, `shipfolio/${id}`);
          mediaUrls.push(uploadResult.url);
        }
      }
    } else {
      const body = await req.json();
      content = body.content || '';
      updateType = body.updateType || 'feature';
      mediaUrls = body.mediaUrls || [];
    }

    if (!content.trim()) {
      return NextResponse.json({ error: 'Update content is required' }, { status: 400 });
    }

    const [newUpdate] = await db
      .insert(projectUpdates)
      .values({
        projectId: id,
        content,
        updateType,
        mediaUrls,
      })
      .returning();

    // Update the parent project's updatedAt timestamp
    await db
      .update(projects)
      .set({ updatedAt: new Date() })
      .where(eq(projects.id, id));

    return NextResponse.json({ success: true, update: newUpdate }, { status: 201 });
  } catch (error) {
    console.error('Failed to create update:', error);
    return NextResponse.json({ error: 'Failed to create update' }, { status: 500 });
  }
}
