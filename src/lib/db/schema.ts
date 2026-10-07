import { pgTable, uuid, varchar, text, timestamp, boolean, jsonb, integer, date } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  type: varchar('type', { length: 20 }).notNull().default('guest'), // 'guest' | 'permanent'
  email: varchar('email', { length: 255 }),
  name: varchar('name', { length: 255 }),
  image: text('image'),
  provider: varchar('provider', { length: 50 }), // 'google' | 'github' | null
  llmProvider: varchar('llm_provider', { length: 20 }), // BYOK: 'gemini' | 'groq'
  llmKeyEncrypted: text('llm_key_encrypted'), // BYOK encrypted key
  createdAt: timestamp('created_at').defaultNow().notNull(),
  lastActiveAt: timestamp('last_active_at').defaultNow().notNull(),
});

export const projects = pgTable('projects', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  context: text('context'), // Free-form context dump
  repoUrl: varchar('repo_url', { length: 500 }),
  websiteUrl: varchar('website_url', { length: 500 }),
  techStack: jsonb('tech_stack').$type<string[]>(),
  targetAudience: text('target_audience'),
  clarifyingAnswers: jsonb('clarifying_answers').$type<Record<string, string>>(),
  status: varchar('status', { length: 20 }).notNull().default('active'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const projectUpdates = pgTable('project_updates', {
  id: uuid('id').defaultRandom().primaryKey(),
  projectId: uuid('project_id').notNull().references(() => projects.id, { onDelete: 'cascade' }),
  content: text('content').notNull(),
  updateType: varchar('update_type', { length: 50 }),
  mediaUrls: jsonb('media_urls').$type<string[]>(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const generatedContent = pgTable('generated_content', {
  id: uuid('id').defaultRandom().primaryKey(),
  projectId: uuid('project_id').notNull().references(() => projects.id, { onDelete: 'cascade' }),
  updateId: uuid('update_id').references(() => projectUpdates.id, { onDelete: 'set null' }),
  platform: varchar('platform', { length: 30 }).notNull(), // 'linkedin' | 'twitter' | 'reddit' | 'medium'
  content: text('content').notNull(),
  visibilityTips: jsonb('visibility_tips').$type<string[]>(),
  mediaUrls: jsonb('media_urls').$type<string[]>(),
  llmProvider: varchar('llm_provider', { length: 20 }),
  llmModel: varchar('llm_model', { length: 50 }),
  isEdited: boolean('is_edited').default(false),
  editedContent: text('edited_content'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const dailyUsage = pgTable('daily_usage', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  date: date('date').notNull(),
  generationCount: integer('generation_count').notNull().default(0),
});

export const sessions = pgTable('sessions', {
  sessionToken: varchar('session_token', { length: 255 }).primaryKey(),
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  expires: timestamp('expires').notNull(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Project = typeof projects.$inferSelect;
export type NewProject = typeof projects.$inferInsert;
export type ProjectUpdate = typeof projectUpdates.$inferSelect;
export type GeneratedContent = typeof generatedContent.$inferSelect;
