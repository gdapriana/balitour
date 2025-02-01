import DistrictService from "../service/district.js";

class DistrictController {
  static async create(req, res, next) {
    try {
      const request = req.body;
      const response = await DistrictService.create(request);
      res.status(200).json({data: response});
    } catch (e) {
      next(e)
    }
  }
  static async get(req, res, next) {
    try {
      const slug = req.params.slug;
      const response = await DistrictService.get(slug);
      res.status(200).json({data: response});
    } catch (e) {
      next(e)
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
      const response = await DistrictService.gets(otherQueries);
      res.status(200).json({ data: response });
    } catch (e) {
      next(e)
    }
  }
  static async update(req, res, next) {
    try {
      const slug = req.params.slug;
      const request = req.body;
      const response = await DistrictService.update(slug, request);
      res.status(200).json({data: response});
    } catch (e) {
      next(e)
    }
  }
  static async delete(req, res, next) {
    try {
      const slug = req.params.slug;
      const response = await DistrictService.delete(slug);
      res.status(200).json({data: response});
    } catch (e) {
      next(e)
    }
  }
}

export default DistrictController;