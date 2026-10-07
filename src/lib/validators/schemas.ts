import { z } from 'zod';

export const createProjectSchema = z.object({
  name: z.string().min(1, 'Project name is required').max(255),
  description: z.string().optional(),
  context: z.string().optional(),
  repoUrl: z.string().url('Invalid GitHub/repository URL').optional().or(z.literal('')),
  websiteUrl: z.string().url('Invalid website URL').optional().or(z.literal('')),
  techStack: z.array(z.string()).optional(),
  targetAudience: z.string().optional(),
});

export type CreateProjectInput = z.infer<typeof createProjectSchema>;
