import { z } from 'zod';

export const createChapterSchema = z.object({
  body: z.object({
    chapterNumber: z.number().min(1, 'Chapter number must be at least 1'),
    title: z.string().optional(),
    content: z.string().optional(),
    isVIP: z.boolean().optional()
  })
});

export const updateChapterSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    content: z.string().optional(),
    isVIP: z.boolean().optional()
  })
});

export type CreateChapterInput = z.infer<typeof createChapterSchema>;
export type UpdateChapterInput = z.infer<typeof updateChapterSchema>;
