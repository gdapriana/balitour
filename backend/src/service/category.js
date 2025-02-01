import validation from "../validation/validation.js";
import CategoryValidation from "../validation/category.js";
import db from "../application/database.js";
import ResponseError from "../error/response.js";
import slugify from "slugify";

class CategoryService {
  static async create(req) {
    const request = validation(CategoryValidation.CREATE, req);
    const slug = slugify(request.name, { lower: true });
    const category = await db.category.findUnique({
      where: { slug }
    })
    if (category) throw new ResponseError(401, "category already exists");
    return db.category.create({
      data: {
        ...request,
        slug
      },
      select: {
        name: true
      }
    })
  }
  static async get(slug) {
    const category = await db.category.findUnique({
      where: { slug },
      include: {
        _count: true,
        destination: true
      }
    })
    if (!category) throw new ResponseError(404, "category not found");
    return category;
  }
  static async gets(req) {
    const queries = validation(CategoryValidation.GETS, req);
    return db.category.findMany({
      where: {
        AND: [
          { name: { contains: queries.name, mode: "insensitive" } },
        ],
      },
      include: {
        _count: true,
        destination: true
      },
      take: queries.count,
    });
  }
  static async update(slug, req) {
    const request = validation(CategoryValidation.UPDATE, req);
    const category = await db.category.findUnique({where: { slug }})
    if (!category) throw new ResponseError(404, "category not found");
    if (request.name) request.slug = slugify(request.name, { lower: true });
    if (request.slug) {
      const check = await db.category.findUnique({where: { slug: request.slug }});
      if (check) throw new ResponseError(404, "category already exists");
    }
    return db.category.update({
      where: { slug },
      data: request,
    })
  }
  static async delete(slug) {
    const category = await db.category.findUnique({where: { slug }})
    if (!category) throw new ResponseError(404, "category not found");
    return db.category.delete({where: { slug }, select: {name: true}})
  }
}

export default CategoryService;