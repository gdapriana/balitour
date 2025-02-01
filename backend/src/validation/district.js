import { z } from "zod";

class DistrictValidation {
  static CREATE = z.object({
    name: z.string().min(1),
    description: z.string().min(20).optional(),
    logo: z.string().min(1).url().optional(),
    cover: z.string().min(1).url().optional(),
    body: z.string().min(50).optional(),
  })
  static GETS = z.object({
    count: z.number().min(1).optional(),
    name: z.string().min(1).max(200).optional(),
  });
  static UPDATE = z.object({
    name: z.string().min(1).optional(),
    description: z.string().min(20).optional().optional(),
    logo: z.string().min(1).url().optional(),
    cover: z.string().min(1).url().optional(),
    body: z.string().min(50).optional(),
  })
}

export default DistrictValidation;