import { db } from '../db';
import { users, User } from '../db/schema';
import { eq } from 'drizzle-orm';

export async function createGuestAccount(): Promise<User> {
  const [guest] = await db
    .insert(users)
    .values({
      type: 'guest',
      name: 'Guest Builder',
      email: null,
      provider: null,
    })
    .returning();

  return guest;
}

export async function convertGuestToPermanent(
  guestUserId: string,
  oauthProfile: { email: string; name: string; provider: string; image?: string }
): Promise<User> {
  const [updatedUser] = await db
    .update(users)
    .set({
      type: 'permanent',
      email: oauthProfile.email,
      name: oauthProfile.name,
      provider: oauthProfile.provider,
      image: oauthProfile.image || null,
      lastActiveAt: new Date(),
    })
    .where(eq(users.id, guestUserId))
    .returning();

  return updatedUser;
}
