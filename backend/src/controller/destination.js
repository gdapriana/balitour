import DestinationService from "../service/destination.js";

class DestinationController {
  static async create(req, res, next) {
    try {
      const request = req.body;
      const response = await DestinationService.create(request);
      res.status(200).json({ data: response });
    } catch (e) {
      next(e);
    }
  }
  static async get(req, res, next) {
    try {
      const request = req.params.slug;
      const response = await DestinationService.get(request);
      res.status(200).json({ data: response });
    } catch (e) {
      next(e);
    }
  }
  static async gets(req, res, next) {
    try {
      const { count, favorited, liked, commented, ...otherQueries } = req.query;
      if (count) {
        const parsedCount = parseInt(count, 10);
        if (isNaN(parsedCount) || parsedCount < 0) {
          return res.status(400).json({
            error: "Invalid count parameter. It must be a non-negative integer.",
          });
        }
        otherQueries.count = parsedCount;
      }
      if (favorited) {
        const parsedFavorited = parseInt(favorited, 10);
        if (isNaN(parsedFavorited) || parsedFavorited < 0) {
          return res.status(400).json({
            error: "Invalid favorited parameter. It must be a non-negative integer.",
          });
        }
        otherQueries.favorited = parsedFavorited;
      }
      if (liked) {
        const parsedLiked = parseInt(liked, 10);
        if (isNaN(parsedLiked) || parsedLiked < 0) {
          return res.status(400).json({
            error: "Invalid liked parameter. It must be a non-negative integer.",
          });
        }
        otherQueries.liked = parsedLiked;
      }
      if (commented) {
        const parsedCommented = parseInt(commented, 10);
        if (isNaN(parsedCommented) || parsedCommented < 0) {
          return res.status(400).json({
            error: "Invalid commented parameter. It must be a non-negative integer.",
          });
        }
        otherQueries.commented = parsedCommented;
      }
      const response = await DestinationService.gets(otherQueries);
      res.status(200).json({ data: response });
    } catch (e) {
      next(e);
    }
  }
  static async update(req, res, next) {
    try {
      const request = req.body;
      const slug = req.params.slug;
      const response = await DestinationService.update(slug, request);
      res.status(200).json({ data: response });
    } catch (e) {
      next(e);
    }
  }
  static async delete(req, res, next) {
    try {
      const request = req.params.slug;
      const response = await DestinationService.delete(request);
      res.status(200).json({ data: response });
    } catch (e) {
      next(e);
    }
  }
  static async comment(req, res, next) {
    try {
      const { body } = req.body;
      const slug = req.params.slug;
      const response = await DestinationService.comment(slug, req.username, body);
      res.status(200).json({ data: response });
    } catch (e) {
      next(e);
    }
  }
  static async uncomment(req, res, next) {
    try {
      const slug = req.params.slug;
      const id = req.params.id;
      const response = await DestinationService.uncomment(slug, req.username, id);
      res.status(200).json({ data: response });
    } catch (e) {
      next(e);
    }
  }
  static async save(req, res, next) {
    try {
      const slug = req.params.slug;
      const username = req.username;
      const response = await DestinationService.save(slug, username);
      res.status(200).json({ data: response });
    } catch (e) {
      next(e);
    }
  }
  static async unsave(req, res, next) {
    try {
      const slug = req.params.slug;
      const username = req.username;
      await DestinationService.unsave(slug, username);
      res.status(200).json({ data: "OK" });
    } catch (e) {
      next(e);
    }
  }
  static async like(req, res, next) {
    try {
      const slug = req.params.slug;
      const username = req.username;
      const response = await DestinationService.like(slug, username);
      res.status(200).json({ data: response });
    } catch (e) {
      next(e);
    }
  }
  static async dislike(req, res, next) {
    try {
      const slug = req.params.slug;
      const username = req.username;
      await DestinationService.dislike(slug, username);
      res.status(200).json({ data: "OK" });
    } catch (e) {
      next(e);
    }
  }
  static async view(req, res, next) {
    try {
      const slug = req.params.slug;
      const username = req.username;
      const response = await DestinationService.view(slug, username);
      res.status(200).json({ data: response });
    } catch (e) {
      next(e);
    }
  }
  static async saved(req, res, next) {
    try {
      const slug = req.params.slug;
      const username = req.username;
      const response = await DestinationService.userSavedDestination(slug, username);
      res.status(200).json({ data: response });
    } catch (e) {
      next(e)
    }
  }
  static async liked(req, res, next) {
    try {
      const slug = req.params.slug;
      const username = req.username;
      const response = await DestinationService.userLikedDestination(slug, username);
      res.status(200).json({ data: response });
    } catch (e) {
      next(e)
    }
  }
  static async viewed(req, res, next) {
    try {
      const slug = req.params.slug;
      const username = req.username;
      const response = await DestinationService.userViewedDestination(slug, username);
      res.status(200).json({ data: response });
    } catch (e) {
      next(e)
    }
  }
}

export default DestinationController;
