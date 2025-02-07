import express from "express";
import cors from "cors";
import errorMiddleware from "../middleware/error.js";
import publicRouter from "../route/public.js";
import authRouter from "../route/auth.js";
import fileUpload from "express-fileupload"
import cloudinary from "../cloudinary.js";

const web = express();

web.use(
  fileUpload({useTempFiles: true, tempFileDir: "/tmp/"})
)


web.use(express.json());
web.use(cors());
web.use(publicRouter);
web.use(authRouter);
web.use(errorMiddleware);

export default web;
