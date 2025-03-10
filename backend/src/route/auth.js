import express from "express";
import UserController from "../controller/user.js";
import authMiddleware from "../middleware/auth.js";
import adminMiddleware from "../middleware/admin.js";
import DestinationController from "../controller/destination.js";
import StoryController from "../controller/story.js";
import CultureController from "../controller/culture.js";
import CategoryController from "../controller/category.js";
import DistrictController from "../controller/district.js";
import SourceController from "../controller/source.js";

const authRouter = express.Router();
authRouter.patch("/api/users/:username", authMiddleware, UserController.update);
authRouter.post("/api/users", authMiddleware, adminMiddleware, UserController.create);
authRouter.get("/api/users", authMiddleware, adminMiddleware, UserController.gets);
authRouter.delete("/api/logout", authMiddleware, UserController.logout);
authRouter.delete("/api/users/:username", authMiddleware, adminMiddleware, UserController.delete);
authRouter.get("/api/verify", authMiddleware, UserController.verify);
authRouter.post("/api/users/profile-image", authMiddleware, UserController.uploadProfileImage);

authRouter.post("/api/destinations", authMiddleware, adminMiddleware, DestinationController.create);
authRouter.patch("/api/destinations/:slug", authMiddleware, adminMiddleware, DestinationController.update);
authRouter.delete("/api/destinations/:slug", authMiddleware, adminMiddleware, DestinationController.delete);
authRouter.post("/api/destinations/:slug/comment", authMiddleware, DestinationController.comment);
authRouter.delete("/api/destinations/:slug/comment/:id", authMiddleware, DestinationController.uncomment);
authRouter.post("/api/destinations/:slug/save", authMiddleware, DestinationController.save);
authRouter.delete("/api/destinations/:slug/save", authMiddleware, DestinationController.unsave);
authRouter.post("/api/destinations/:slug/like", authMiddleware, DestinationController.like);
authRouter.delete("/api/destinations/:slug/like", authMiddleware, DestinationController.dislike);
authRouter.post("/api/destinations/:slug/view", authMiddleware, DestinationController.view);
authRouter.get("/api/destinations/:slug/saved", authMiddleware, DestinationController.saved);
authRouter.get("/api/destinations/:slug/liked", authMiddleware, DestinationController.liked);
authRouter.get("/api/destinations/:slug/viewed", authMiddleware, DestinationController.viewed);
authRouter.post("/api/destinations/cover", authMiddleware, adminMiddleware, DestinationController.uploadCover);

authRouter.post("/api/stories", authMiddleware, StoryController.create);
authRouter.patch("/api/stories/:slug", authMiddleware, StoryController.update);
authRouter.delete("/api/stories/:slug", authMiddleware, StoryController.delete);
authRouter.post("/api/stories/:slug/comment", authMiddleware, StoryController.comment);
authRouter.delete("/api/stories/:slug/comment/:id", authMiddleware, StoryController.uncomment);
authRouter.post("/api/stories/:slug/save", authMiddleware, StoryController.save);
authRouter.delete("/api/stories/:slug/save", authMiddleware, StoryController.unsave);
authRouter.post("/api/stories/:slug/like", authMiddleware, StoryController.like);
authRouter.delete("/api/stories/:slug/like", authMiddleware, StoryController.dislike);
authRouter.post("/api/stories/:slug/view", authMiddleware, StoryController.view);
authRouter.get("/api/stories/:slug/saved", authMiddleware, StoryController.saved);
authRouter.get("/api/stories/:slug/liked", authMiddleware, StoryController.liked);
authRouter.get("/api/stories/:slug/viewed", authMiddleware, StoryController.viewed);
authRouter.post("/api/stories/cover", authMiddleware, StoryController.uploadCover);

authRouter.post("/api/cultures", authMiddleware, adminMiddleware, CultureController.create);
authRouter.patch("/api/cultures/:slug", authMiddleware, adminMiddleware, CultureController.update);
authRouter.delete("/api/cultures/:slug", authMiddleware, adminMiddleware, CultureController.delete);
authRouter.post("/api/cultures/:slug/comment", authMiddleware, CultureController.comment);
authRouter.delete("/api/cultures/:slug/comment/:id", authMiddleware, CultureController.uncomment);
authRouter.post("/api/cultures/:slug/save", authMiddleware, CultureController.save);
authRouter.delete("/api/cultures/:slug/save", authMiddleware, CultureController.unsave);
authRouter.post("/api/cultures/:slug/like", authMiddleware, CultureController.like);
authRouter.delete("/api/cultures/:slug/like", authMiddleware, CultureController.dislike);
authRouter.post("/api/cultures/:slug/view", authMiddleware, CultureController.view);
authRouter.get("/api/cultures/:slug/saved", authMiddleware, CultureController.saved);
authRouter.get("/api/cultures/:slug/liked", authMiddleware, CultureController.liked);
authRouter.get("/api/cultures/:slug/viewed", authMiddleware, CultureController.viewed);
authRouter.post("/api/cultures/cover", authMiddleware, adminMiddleware, CultureController.uploadCover);

authRouter.post("/api/categories", authMiddleware, adminMiddleware, CategoryController.create);
authRouter.patch("/api/categories/:slug", authMiddleware, adminMiddleware, CategoryController.update);
authRouter.delete("/api/categories/:slug", authMiddleware, adminMiddleware, CategoryController.delete);

authRouter.post("/api/districts", authMiddleware, adminMiddleware, DistrictController.create);
authRouter.patch("/api/districts/:slug", authMiddleware, adminMiddleware, DistrictController.update);
authRouter.delete("/api/districts/:slug", authMiddleware, adminMiddleware, DistrictController.delete);

authRouter.post("/api/sources", authMiddleware, SourceController.create);
authRouter.patch("/api/sources/:id", authMiddleware, SourceController.update);
authRouter.delete("/api/sources/:id", authMiddleware, SourceController.delete);

export default authRouter;
