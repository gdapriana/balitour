import validation from "../validation/validation.js";
import SourceValidation from "../validation/source.js";
import db from "../application/database.js";
import ResponseError from "../error/response.js";

class SourceService {
  static async create(requestBody) {
    const body = validation(SourceValidation.CREATE, requestBody);
    return db.source.create({
      data: body,
    });
  }
  static async update(requestBody, id) {
    const getSource = await db.source.findFirst({ where: { id } });
    if (!getSource) throw new ResponseError(404, "source not found");
    const updatedBody = validation(SourceValidation.UPDATE, requestBody);
    return db.source.update({
      where: { id },
      data: updatedBody,
    });
  }
  static async delete(id) {
    const getSource = await db.source.findFirst({ where: { id } });
    if (!getSource) throw new ResponseError(404, "source not found");
    return db.source.delete({
      where: { id },
      select: { name: true },
    });
  }
}

export default SourceService;
