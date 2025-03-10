import express from "express";
import welcome from "../controller/welcome.js";
import UserController from "../controller/user.js";
import DestinationController from "../controller/destination.js";
import StoryController from "../controller/story.js";
import CultureController from "../controller/culture.js";
import CategoryController from "../controller/category.js";
import DistrictController from "../controller/district.js";

const publicRouter = express.Router();
publicRouter.get("/", welcome);
publicRouter.post("/api/register", UserController.register);
publicRouter.get("/api/users/:username", UserController.get);
publicRouter.post("/api/login", UserController.login);

publicRouter.get("/api/destinations", DestinationController.gets);
publicRouter.get("/api/destinations/:slug", DestinationController.get);

publicRouter.get("/api/stories", StoryController.gets);
publicRouter.get("/api/stories/:slug", StoryController.get);

publicRouter.get("/api/cultures", CultureController.gets);
publicRouter.get("/api/cultures/:slug", CultureController.get);

publicRouter.get("/api/categories", CategoryController.gets);
publicRouter.get("/api/categories/:slug", CategoryController.get);

publicRouter.get("/api/districts", DistrictController.gets);
publicRouter.get("/api/districts/:slug", DistrictController.get);

export default publicRouter;
