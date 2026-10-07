import { describe, it, expect } from 'vitest';
import { users, projects, projectUpdates, generatedContent, dailyUsage, sessions } from '@/lib/db/schema';

describe('Drizzle Database Schema Definitions', () => {
  it('should define users table columns correctly', () => {
    expect(users.id).toBeDefined();
    expect(users.type).toBeDefined();
    expect(users.email).toBeDefined();
  });

  it('should define projects table columns correctly', () => {
    expect(projects.id).toBeDefined();
    expect(projects.userId).toBeDefined();
    expect(projects.name).toBeDefined();
    expect(projects.clarifyingAnswers).toBeDefined();
  });

  it('should define generatedContent table with visibilityTips column', () => {
    expect(generatedContent.id).toBeDefined();
    expect(generatedContent.platform).toBeDefined();
    expect(generatedContent.visibilityTips).toBeDefined();
  });
});
