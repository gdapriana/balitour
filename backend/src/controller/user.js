import UserService from "../service/user.js";
import cloudinary from "../cloudinary.js";

class UserController {
  static async create(req, res, next) {
    try {
      const request = req.body;
      const response = await UserService.create(request);
      res.status(200).json({ data: response });
    } catch (e) {
      next(e);
    }
  }
  static async register(req, res, next) {
    try {
      const request = req.body;
      const response = await UserService.register(request);
      res.status(200).json({ data: response });
    } catch (e) {
      next(e);
    }
  }
  static async login(req, res, next) {
    try {
      const request = req.body;
      const response = await UserService.login(request);
      res.status(200).json({ data: response });
    } catch (e) {
      next(e);
    }
  }
  static async get(req, res, next) {
    try {
      const username = req.params.username;
      const response = await UserService.get(username);
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
      const response = await UserService.gets(otherQueries);
      res.status(200).json({ data: response });
    } catch (e) {
      next(e);
    }
  }
  static async update(req, res, next) {
    try {
      const request = req.body;
      const username = req.params.username;
      const response = await UserService.update(request, username);
      return res.status(200).json({ data: response });
    } catch (e) {
      next(e);
    }
  }
  static async logout(req, res, next) {
    try {
      const response = await UserService.logout(req.username);
      res.status(200).json({ data: response });
    } catch (e) {
      next(e);
    }
  }
  static async delete(req, res, next) {
    try {
      const username = req.params.username;
      await UserService.delete(username);
      res.status(200).json({ data: "OK" });
    } catch (e) {
      next(e);
    }
  }
  static async verify(req, res, next) {
    try {
      const username = req.username;
      const response = await UserService.verify(username);
      res.status(200).json({ data: response });
    } catch (e) {
      next(e);
    }
  }
  static async uploadProfileImage(req, res) {
    const { photo } = req.files;
    if (!photo) {
      res.status(400).json({ status: 400, message: "Profile Image is required" });
    }
    await cloudinary.v2.uploader.upload(
      photo.tempFilePath,
      {
        public_id: new Date().getTime(),
        folder: "profile",
      },
      (error, result) => {
        if (error) {
          res.status(500).json({ status: 500, message: "upload failed", error });
        } else {
          res.json({ status: 200, message: "Success", result });
        }
      },
    );
  }
}

export default UserController;
