import CultureService from "../service/culture.js";
import DestinationService from "../service/destination.js";
import cloudinary from "../cloudinary.js";

class CultureController {
  static async create(req, res, next) {
    try {
      const request = req.body;
      const response = await CultureService.create(request);
      res.status(200).json({ data: response });
    } catch (e) {
      next(e);
    }
  }
  static async get(req, res, next) {
    try {
      const request = req.params.slug;
      console.log(request);
      const response = await CultureService.get(request);
      res.status(200).json({ data: response });
    } catch (e) {
      next(e);
    }
  }
  static async gets(req, res, next) {
    try {
      const { count, ...otherQueries } = req.query;
      if (count) {
        const parsedCount = parseInt(count, 10);
        if (isNaN(parsedCount) || parsedCount < 0) {
          return res.status(400).json({
            error: "Invalid count parameter. It must be a non-negative integer.",
          });
        }
        otherQueries.count = parsedCount;
      }
      const response = await CultureService.gets(otherQueries);
      res.status(200).json({ data: response });
    } catch (e) {
      next(e);
    }
  }
  static async update(req, res, next) {
    try {
      const request = req.body;
      const slug = req.params.slug;
      const response = await CultureService.update(slug, request);
      res.status(200).json({ data: response });
    } catch (e) {
      next(e);
    }
  }
  static async delete(req, res, next) {
    try {
      const request = req.params.slug;
      const response = await CultureService.delete(request);
      res.status(200).json({ data: response });
    } catch (e) {
      next(e);
    }
  }
  static async comment(req, res, next) {
    try {
      const { body } = req.body;
      const slug = req.params.slug;
      const response = await CultureService.comment(slug, req.username, body);
      res.status(200).json({ data: response });
    } catch (e) {
      next(e);
    }
  }
  static async uncomment(req, res, next) {
    try {
      const slug = req.params.slug;
      const id = req.params.id;
      const response = await CultureService.uncomment(slug, req.username, id);
      res.status(200).json({ data: response });
    } catch (e) {
      next(e);
    }
  }
  static async save(req, res, next) {
    try {
      const slug = req.params.slug;
      const username = req.username;
      const response = await CultureService.save(slug, username);
      res.status(200).json({ data: response });
    } catch (e) {
      next(e);
    }
  }
  static async unsave(req, res, next) {
    try {
      const slug = req.params.slug;
      const username = req.username;
      await CultureService.unsave(slug, username);
      res.status(200).json({ data: "OK" });
    } catch (e) {
      next(e);
    }
  }
  static async like(req, res, next) {
    try {
      const slug = req.params.slug;
      const username = req.username;
      const response = await CultureService.like(slug, username);
      res.status(200).json({ data: response });
    } catch (e) {
      next(e);
    }
  }
  static async dislike(req, res, next) {
    try {
      const slug = req.params.slug;
      const username = req.username;
      await CultureService.dislike(slug, username);
      res.status(200).json({ data: "OK" });
    } catch (e) {
      next(e);
    }
  }
  static async view(req, res, next) {
    try {
      const slug = req.params.slug;
      const username = req.username;
      const response = await CultureService.view(slug, username);
      res.status(200).json({ data: response });
    } catch (e) {
      next(e);
    }
  }
  static async saved(req, res, next) {
    try {
      const slug = req.params.slug;
      const username = req.username;
      const response = await CultureService.userSavedCulture(slug, username);
      res.status(200).json({ data: response });
    } catch (e) {
      next(e)
    }
  }
  static async liked(req, res, next) {
    try {
      const slug = req.params.slug;
      const username = req.username;
      const response = await CultureService.userLikedCulture(slug, username);
      res.status(200).json({ data: response });
    } catch (e) {
      next(e)
    }
  }
  static async viewed(req, res, next) {
    try {
      const slug = req.params.slug;
      const username = req.username;
      const response = await CultureService.userViewedCulture(slug, username);
      res.status(200).json({ data: response });
    } catch (e) {
      next(e)
    }
  }
  static async uploadCover(req, res) {
    const {cover} = req.files;
    if (!cover) {
      res.status(400).json({ status: 400, message: "Cover is required" });
    }
    await cloudinary.v2.uploader.upload(
      cover.tempFilePath,
      {
        public_id: new Date().getTime(),
        folder: "cultures/cover",
      }, (error, result) => {
        if (error) {
          res.status(500).json({status: 500, message: "upload failed", error});
        } else {
          res.json({status: 200, message: "Success", result});
        }
      }
    )
  }
}
export default CultureController;