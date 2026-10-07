import { describe, it, expect, vi } from 'vitest';
import { convertGuestToPermanent } from '@/lib/auth/guest';

// Mock DB
vi.mock('@/lib/db', () => ({
  db: {
    update: vi.fn().mockReturnThis(),
    set: vi.fn().mockReturnThis(),
    where: vi.fn().mockReturnThis(),
    returning: vi.fn().mockImplementation(() => Promise.resolve([{
      id: 'guest-uuid-1234',
      type: 'permanent',
      email: 'test@example.com',
      name: 'Test Builder',
      provider: 'google',
    }])),
  },
}));

describe('Guest-to-Permanent Account Conversion', () => {
  it('should update user record from guest to permanent while preserving user ID', async () => {
    const updated = await convertGuestToPermanent('guest-uuid-1234', {
      email: 'test@example.com',
      name: 'Test Builder',
      provider: 'google',
    });

    expect(updated.type).toBe('permanent');
    expect(updated.id).toBe('guest-uuid-1234');
    expect(updated.email).toBe('test@example.com');
  });
});
