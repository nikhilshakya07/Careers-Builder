// Validation utilities
import { z } from 'zod';

export const companySlugSchema = z.string().min(1).max(50).regex(/^[a-z0-9-]+$/);

export const themeSchema = z.object({
  primary: z.string().optional(),
  secondary: z.string().optional(),
  accent: z.string().optional(),
  logo: z.string().url().optional().or(z.literal('')),
  banner: z.string().url().optional().or(z.literal('')),
  video: z.string().url().optional().or(z.literal('')),
});

