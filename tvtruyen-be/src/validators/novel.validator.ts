import { z } from 'zod';

export const createNovelSchema = z.object({
  body: z.object({
    title: z.string().min(1, 'Title is required'),
    alternativeTitles: z.array(z.string()).optional(),
    author: z.string().optional(),
    description: z.string().optional(),
    coverImage: z.string().url().optional(),
    categories: z.array(z.string()).optional(),
    status: z.enum(['ongoing', 'completed']).optional(),
    badge: z.enum(['hot', 'vip', 'full']).optional(),
    isVIP: z.boolean().optional(),
    isExclusive: z.boolean().optional()
  })
});

export const updateNovelSchema = z.object({
  body: z.object({
    title: z.string().min(1).optional(),
    alternativeTitles: z.array(z.string()).optional(),
    author: z.string().optional(),
    description: z.string().optional(),
    coverImage: z.string().url().optional(),
    categories: z.array(z.string()).optional(),
    status: z.enum(['ongoing', 'completed']).optional(),
    badge: z.enum(['hot', 'vip', 'full']).optional(),
    isVIP: z.boolean().optional(),
    isExclusive: z.boolean().optional()
  })
});

export const novelQuerySchema = z.object({
  query: z.object({
    page: z.coerce.number().min(1).optional(),
    limit: z.coerce.number().min(1).max(100).optional(),
    sort: z.enum(['newest', 'oldest', 'views', 'chapters', 'rating']).optional(),
    badge: z.enum(['hot', 'vip', 'full']).optional(),
    status: z.enum(['ongoing', 'completed']).optional(),
    category: z.string().optional(),
    minChapters: z.coerce.number().optional(),
    maxChapters: z.coerce.number().optional()
  })
});

export type CreateNovelInput = z.infer<typeof createNovelSchema>;
export type UpdateNovelInput = z.infer<typeof updateNovelSchema>;
export type NovelQueryInput = z.infer<typeof novelQuerySchema>;
