import SourceService from "../service/source.js";

class SourceController {
  static async create(req, res, next) {
    try {
      const body = req.body;
      const response = await SourceService.create(body);
      res.status(200).json({ data: response });
    } catch (e) {
      next(e);
    }
  }
  static async update(req, res, next) {
    try {
      const id = req.params.id;
      const body = req.body;
      const response = await SourceService.update(body, id);
      res.status(200).json({ data: response });
    } catch (e) {
      next(e);
    }
  }
  static async delete(req, res, next) {
    try {
      const id = req.params.id;
      const response = await SourceService.delete(id);
      res.status(200).json({ data: response });
    } catch (e) {
      next(e);
    }
  }
}

export default SourceController;
