import { describe, it, expect } from 'vitest';
import { BASE_SYSTEM_PROMPT } from '@/lib/llm/prompts/system';
import { LINKEDIN_PROMPT } from '@/lib/llm/prompts/linkedin';
import { TWITTER_PROMPT } from '@/lib/llm/prompts/twitter';

describe('ASD-STE100 & Platform Prompts', () => {
  it('should contain ASD-STE100 active voice and word limit rules in system prompt', () => {
    expect(BASE_SYSTEM_PROMPT).toContain('ASD-STE100');
    expect(BASE_SYSTEM_PROMPT).toContain('active voice');
    expect(BASE_SYSTEM_PROMPT).toContain('Maximum 20 words');
    expect(BASE_SYSTEM_PROMPT).toContain('NEVER use "I\'m excited to announce');
  });

  it('should define LinkedIn specific constraints', () => {
    expect(LINKEDIN_PROMPT).toContain('LinkedIn');
    expect(LINKEDIN_PROMPT).toContain('hashtags');
  });

  it('should define X/Twitter specific constraints', () => {
    expect(TWITTER_PROMPT).toContain('280 characters');
  });
});
