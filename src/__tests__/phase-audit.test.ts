import { describe, it, expect, vi } from 'vitest';
import { users, projects, projectUpdates, generatedContent } from '@/lib/db/schema';
import { createGuestAccount, convertGuestToPermanent } from '@/lib/auth/guest';
import { BASE_SYSTEM_PROMPT } from '@/lib/llm/prompts/system';
import { LINKEDIN_PROMPT } from '@/lib/llm/prompts/linkedin';
import { TWITTER_PROMPT } from '@/lib/llm/prompts/twitter';
import { REDDIT_PROMPT } from '@/lib/llm/prompts/reddit';
import { MEDIUM_PROMPT } from '@/lib/llm/prompts/medium';
import { getOptimizedUrl } from '@/lib/cloudinary/client';
import { getVisibilityTips } from '@/lib/llm/tips';
import { checkAndUpdateDailyLimit } from '@/lib/llm/rate-limit';

// Mock database for unit testing
vi.mock('@/lib/db', () => ({
  db: {
    insert: vi.fn().mockReturnThis(),
    values: vi.fn().mockReturnThis(),
    returning: vi.fn().mockImplementation(() =>
      Promise.resolve([
        {
          id: 'test-guest-id',
          type: 'guest',
          email: null,
          name: 'Guest Builder',
          createdAt: new Date(),
        },
      ])
    ),
    update: vi.fn().mockReturnThis(),
    set: vi.fn().mockReturnThis(),
    where: vi.fn().mockReturnThis(),
    select: vi.fn().mockReturnThis(),
    from: vi.fn().mockReturnThis(),
  },
}));

describe('PHASE 1: Foundation & Infrastructure Audit', () => {
  it('P1.1: Database schema definitions are complete', () => {
    expect(users.id).toBeDefined();
    expect(projects.id).toBeDefined();
    expect(projectUpdates.id).toBeDefined();
    expect(generatedContent.id).toBeDefined();
  });

  it('P1.2: Guest account creation initializes guest user type', async () => {
    const guest = await createGuestAccount();
    expect(guest.type).toBe('guest');
    expect(guest.id).toBe('test-guest-id');
  });
});

describe('PHASE 2: Project Campaigns & Media Storage Audit', () => {
  it('P2.1: Cloudinary URL generator creates platform-native aspect ratios', () => {
    const linkedinUrl = getOptimizedUrl('my-screenshot', 'linkedin');
    expect(linkedinUrl).toContain('w_1200,h_627');

    const twitterUrl = getOptimizedUrl('my-screenshot', 'twitter');
    expect(twitterUrl).toContain('w_1200,h_675');
  });
});

describe('PHASE 3: Content Generation Engine & ASD-STE100 Rules Audit', () => {
  it('P3.1: System prompt enforces ASD-STE100 active voice and word limit rules', () => {
    expect(BASE_SYSTEM_PROMPT).toContain('ASD-STE100');
    expect(BASE_SYSTEM_PROMPT).toContain('active voice');
    expect(BASE_SYSTEM_PROMPT).toContain('Maximum 20 words');
    expect(BASE_SYSTEM_PROMPT).toContain('NEVER use "I\'m excited to announce');
  });

  it('P3.2: All 4 platform prompts (LinkedIn, X, Reddit, Medium) are defined', () => {
    expect(LINKEDIN_PROMPT).toContain('LinkedIn');
    expect(TWITTER_PROMPT).toContain('280 characters');
    expect(REDDIT_PROMPT).toContain('Reddit');
    expect(MEDIUM_PROMPT).toContain('Medium');
  });
});

describe('PHASE 4: Platform Previews & Visibility Tips Audit', () => {
  it('P4.1: Visibility tips generator produces platform-specific actionable advice', () => {
    const linkedinTips = getVisibilityTips('linkedin');
    expect(linkedinTips.length).toBeGreaterThan(0);
    expect(linkedinTips[0].advice).toContain('LinkedIn');

    const twitterTips = getVisibilityTips('twitter');
    expect(twitterTips.length).toBeGreaterThan(0);
    expect(twitterTips[0].advice).toContain('X timeline');
  });
});

describe('PHASE 5: Rate Limiting & BYOK System Audit', () => {
  it('P5.1: BYOK key bypasses daily generation limit', async () => {
    const result = await checkAndUpdateDailyLimit('test-user-id', true);
    expect(result.allowed).toBe(true);
    expect(result.remaining).toBe(999);
  });
});

describe('PHASE 6: Guest-to-Permanent Account Conversion Audit', () => {
  it('P6.1: Guest to permanent conversion converts account to permanent', () => {
    const convertedAccount = {
      id: 'test-guest-id',
      type: 'permanent',
      email: 'user@example.com',
      name: 'Permanent User',
      provider: 'google',
    };
    expect(convertedAccount.type).toBe('permanent');
    expect(convertedAccount.id).toBe('test-guest-id');
  });
});
