import validation from "../validation/validation.js";
import DestinationValidation from "../validation/destination.js";
import db from "../application/database.js";
import slugify from "slugify";
import ResponseError from "../error/response.js";

class DestinationService {
  static async create(req) {
    const request = validation(DestinationValidation.CREATE, req);
    const slug = `${slugify(request.name, { lower: true })}-${new Date().getTime()}`;
    return db.destination.create({
      data: { ...request, slug },
      select: { name: true },
    });
  }
  static async get(slug) {
    const request = validation(DestinationValidation.GET, slug);
    const destination = await db.destination.findUnique({
      where: { slug: request },
      include: {
        _count: true,
        users_save_destinations: true,
        District: true,
        Category: true,
        users_like_destinations: true,
        users_view_destinations: true,
        users_comment_destinations:{
          include: {user: {select: {username: true, profilePicture: true}}}
        },
        Image: true,
        Source: true,
        Story: true
      },
    });
    if (!destination) throw new ResponseError(404, "destination not found");
    return destination;
  }
  static async gets(req) {
    let cat = []
    let dis = []
    const queries = validation(DestinationValidation.GETS, req);
    if (queries.category) {
      if (typeof queries.category === "string") {
        cat.push({categorySlug: queries.category});
      } else {
        for (const category of queries.category) {
          cat.push({categorySlug: category});
        }
      }
    }
    if (queries.district) {
      if (typeof queries.district === "string") {
        dis.push({districtSlug: queries.district});
      } else {
        for (const district of queries.district) {
          dis.push({districtSlug: district});
        }
      }
    }
    return db.destination.findMany({
      where: {
        AND: [
          { name: { contains: queries.name, mode: "insensitive" } },
          { description: { contains: queries.description, mode: "insensitive" } },
          { address: { contains: queries.address, mode: "insensitive" } },
          {
            OR: cat
          },
          {
            OR: dis
          }
        ],
      },
      include: {
        _count: true,
        Category: true,
        District: true,
        users_save_destinations: true
      },
      take: queries.count,
    });
  }
  static async update(slug, req) {
    const request = validation(DestinationValidation.UPDATE, req);
    const destination = await db.destination.findUnique({
      where: { slug },
    });
    if (!destination) throw new ResponseError(404, "destination not found");
    if (request.name) request.slug = `${slugify(request.name, { lower: true })}-${new Date().getTime()}`;
    return db.destination.update({
      where: { slug },
      data: request,
      select: { name: true },
    });
  }
  static async delete(slug) {
    const destination = await db.destination.findUnique({
      where: { slug },
    });
    if (!destination) throw new ResponseError(404, "destination not found");
    return db.destination.delete({
      where: { slug },
      select: { name: true },
    });
  }
  static async comment(slug, username, body) {
    const request = validation(DestinationValidation.COMMENT, body);
    const destination = await db.destination.findUnique({
      where: { slug },
    });
    if (!destination) throw new ResponseError(404, "destination not found");
    return db.users_comment_destinations.create({
      data: {
        destinationSlug: slug,
        body: request,
        username,
      },
      select: {
        username: true,
      },
    });
  }
  static async uncomment(slug, username, id) {
    const comment = await db.users_comment_destinations.findUnique({
      where: {
        id,
        username,
        destinationSlug: slug,
      },
    });
    if (!comment) throw new ResponseError(404, "comment not found");
    return db.users_comment_destinations.delete({
      where: {
        id,
        username,
        destinationSlug: slug,
      },
      select: {
        id: true,
      },
    });
  }
  static async save(slug, username) {
    const destination = await db.destination.findUnique({
      where: { slug },
    });
    if (!destination) throw new ResponseError(404, "destination not found");
    const saved = await db.users_save_destinations.findFirst({
      where: {
        username,
        destinationSlug: slug,
      },
    });
    if (saved) throw new ResponseError(400, "destination already saved");
    return db.users_save_destinations.create({
      data: {
        destinationSlug: slug,
        username,
      },
      select: {
        destination: true,
      },
    });
  }
  static async unsave(slug, username) {
    const saved = await db.users_save_destinations.findFirst({
      where: {
        destinationSlug: slug,
        username: username,
      },
    });
    if (!saved) throw new ResponseError(400, "destination not saved");
    await db.users_save_destinations.deleteMany({
      where: {
        username: username,
        destinationSlug: slug,
      },
    });
  }
  static async like(slug, username) {
    const destination = await db.destination.findUnique({
      where: { slug },
    });
    if (!destination) throw new ResponseError(404, "destination not found");
    const liked = await db.users_like_destinations.findFirst({
      where: {
        destinationSlug: slug,
        username,
      },
    });
    if (liked) throw new ResponseError(400, "destination already liked");
    return db.users_like_destinations.create({
      data: {
        destinationSlug: slug,
        username,
      },
      select: {
        destination: true,
      },
    });
  }
  static async dislike(slug, username) {
    const destination = await db.destination.findUnique({
      where: { slug },
    });
    if (!destination) throw new ResponseError(404, "destination not found");
    const liked = await db.users_like_destinations.findFirst({
      where: {
        destinationSlug: slug,
        username,
      },
    });
    if (!liked) throw new ResponseError(400, "destination not liked");
    await db.users_like_destinations.deleteMany({
      where: {
        destinationSlug: slug,
        username,
      },
    });
  }
  static async view(slug, username) {
    const destination = await db.destination.findUnique({
      where: { slug },
    });
    if (!destination) throw new ResponseError(404, "destination not found");
    const viewed = await db.users_view_destinations.findFirst({
      where: {
        username: username,
        destinationSlug: slug,
      },
    });
    if (viewed) throw new ResponseError(400, "destination already viewed");
    return db.users_view_destinations.create({
      data: {
        username,
        destinationSlug: slug,
      },
      select: { destination: true },
    });
  }
  static async userSavedDestination(slug, username) {
    const destination = await db.destination.findUnique({
      where: { slug },
    })
    if (!destination) throw new ResponseError(404, "destination not found");
    const savedDestination = await db.users_save_destinations.findFirst({
      where: {
        username, destinationSlug: slug
      }
    })
    if(!savedDestination) return false;
    return true
  }
  static async userLikedDestination(slug, username) {
    const destination = await db.destination.findUnique({
      where: { slug },
    })
    if (!destination) throw new ResponseError(404, "destination not found");
    const likedDestination = await db.users_like_destinations.findFirst({
      where: {
        username, destinationSlug: slug
      }
    })
    if(!likedDestination) return false;
    return true
  }
  static async userViewedDestination(slug, username) {
    const destination = await db.destination.findUnique({
      where: { slug },
    })
    if (!destination) throw new ResponseError(404, "destination not found");
    const viewedDestination = await db.users_view_destinations.findFirst({
      where: {
        username, destinationSlug: slug
      }
    })
    if(!viewedDestination) return false;
    return true
  }
}

export default DestinationService;
