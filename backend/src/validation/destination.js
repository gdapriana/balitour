import { z } from "zod";

class DestinationValidation {
  static CREATE = z.object({
    name: z.string().min(1).max(200),
    description: z.string().min(10).max(400),
    cover: z.string().url().min(1),
    address: z.string().min(1).max(200),
    map: z.string().min(1),
    price: z.number().min(0).optional(),
    districtSlug: z.string().min(1).optional(),
    categorySlug: z.string().min(1).optional(),
  });
  static GET = z.string().min(1);
  static GETS = z.object({
    count: z.number().min(1).optional(),
    name: z.string().min(1).max(200).optional(),
    description: z.string().min(1).max(200).optional(),
    address: z.string().min(1).max(200).optional(),
    favorited:z.number().min(0).max(1).optional(),
    liked:z.number().min(0).max(1).optional(),
    commented:z.number().min(1).max(200).optional(),
    category: z.array(z.string()).or(z.string()).optional(),
    district: z.array(z.string()).or(z.string()).optional()
  });
  static UPDATE = z.object({
    name: z.string().min(1).max(200).optional(),
    slug: z.string().min(1).max(200).optional(),
    description: z.string().min(10).max(400).optional(),
    cover: z.string().url().min(1).optional(),
    address: z.string().min(1).max(200).optional(),
    map: z.string().url().min(1).optional(),
    price: z.number().min(0).optional().optional(),
    districtSlug: z.string().min(1).optional().optional(),
    categorySlug: z.string().min(1).optional().optional(),
  });
  static COMMENT = z.string().min(1);
}

export default DestinationValidation;
