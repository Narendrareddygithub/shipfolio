import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createGuestAccount, convertGuestToPermanent } from '@/lib/auth/guest';

// Mock the database client
vi.mock('@/lib/db', () => ({
  db: {
    insert: vi.fn().mockReturnThis(),
    values: vi.fn().mockReturnThis(),
    returning: vi.fn().mockImplementation((val) => Promise.resolve([{
      id: 'test-guest-uuid-1234',
      type: 'guest',
      email: null,
      name: 'Guest Builder',
      createdAt: new Date(),
      lastActiveAt: new Date(),
    }])),
    update: vi.fn().mockReturnThis(),
    set: vi.fn().mockReturnThis(),
    where: vi.fn().mockReturnThis(),
  },
}));

describe('Guest Account Logic', () => {
  it('should create a guest account with default type "guest"', async () => {
    const guest = await createGuestAccount();
    expect(guest.type).toBe('guest');
    expect(guest.id).toBe('test-guest-uuid-1234');
    expect(guest.email).toBeNull();
  });
});
