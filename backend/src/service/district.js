import validation from "../validation/validation.js";
import db from "../application/database.js";
import ResponseError from "../error/response.js";
import slugify from "slugify";
import DistrictValidation from "../validation/district.js";

class DistrictService {
  static async create(req) {
    const request = validation(DistrictValidation.CREATE, req);
    const slug = slugify(request.name, { lower: true });
    const district = await db.district.findUnique({
      where: { slug }
    })
    if (district) throw new ResponseError(401, "district already exists");
    return db.district.create({
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
    const district = await db.district.findUnique({
      where: { slug },
      include: {
        _count: true,
        cultures: true,
        destinations: true
      }
    })
    if (!district) throw new ResponseError(404, "category not found");
    return district;
  }
  static async gets(req) {
    const queries = validation(DistrictValidation.GETS, req);
    return db.district.findMany({
      where: {
        AND: [
          { name: { contains: queries.name, mode: "insensitive" } },
        ],
      },
      include: {
        _count: true,
        destinations: true,
        cultures: true
      },
      take: queries.count,
    });
  }
  static async update(slug, req) {
    const request = validation(DistrictValidation.UPDATE, req);
    const district = await db.district.findUnique({where: { slug }})
    if (!district) throw new ResponseError(404, "district not found");
    if (request.name) request.slug = slugify(request.name, { lower: true });
    if (request.slug) {
      const check = await db.district.findUnique({where: { slug: request.slug }});
      if (check) throw new ResponseError(404, "district already exists");
    }
    return db.district.update({
      where: { slug },
      data: request,
    })
  }
  static async delete(slug) {
    const district = await db.district.findUnique({where: { slug }})
    if (!district) throw new ResponseError(404, "district not found");
    return db.district.delete({where: { slug }, select: {name: true}})
  }
}

export default DistrictService;