import { NextResponse } from 'next/server';
import { createGuestAccount } from '@/lib/auth/guest';

export async function POST() {
  try {
    const guest = await createGuestAccount();
    const response = NextResponse.json({ success: true, guest });
    
    // Set guest session cookie (1 year expiry)
    response.cookies.set('shipfolio_guest_id', guest.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 365,
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Failed to create guest account:', error);
    return NextResponse.json({ error: 'Failed to initialize session' }, { status: 500 });
  }
}
