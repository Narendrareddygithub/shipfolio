import { NextRequest, NextResponse } from 'next/server';
import { convertGuestToPermanent } from '@/lib/auth/guest';

export async function POST(req: NextRequest) {
  try {
    const guestId = req.cookies.get('shipfolio_guest_id')?.value;
    if (!guestId) {
      return NextResponse.json({ error: 'No active guest session found' }, { status: 400 });
    }

    const body = await req.json();
    const { email, name, provider, image } = body;

    if (!email || !name) {
      return NextResponse.json({ error: 'Email and name are required' }, { status: 400 });
    }

    const updatedUser = await convertGuestToPermanent(guestId, {
      email,
      name,
      provider: provider || 'oauth',
      image,
    });

    return NextResponse.json({ success: true, user: updatedUser });
  } catch (error) {
    console.error('Failed to convert guest account:', error);
    return NextResponse.json({ error: 'Failed to convert account' }, { status: 500 });
  }
}
