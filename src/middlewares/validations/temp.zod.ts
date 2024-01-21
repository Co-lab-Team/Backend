import { z } from "zod";

// define shared schemas
const uuidSchema = z.string().uuid();

// template schema
const templateSchema = z.object({
  title: z.string(),
  description: z.string(),
  fileSize: z.string(),
  template: z.string(),
  category: z.string(),
  tags: z.array(z.string()),
  creatorID: uuidSchema,
});

export { templateSchema };
