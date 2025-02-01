import { z } from "zod";

class CategoryValidation {
  static CREATE = z.object({
    name: z.string().min(1),
    description: z.string().min(20).optional(),
  })
  static GETS = z.object({
    count: z.number().min(1).optional(),
    name: z.string().min(1).max(200).optional(),
  });
  static UPDATE = z.object({
    name: z.string().min(1).optional(),
    description: z.string().min(20).optional().optional(),
  })
}

export default CategoryValidation;