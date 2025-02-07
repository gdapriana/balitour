import express from "express";
import cors from "cors";
import errorMiddleware from "../middleware/error.js";
import publicRouter from "../route/public.js";
import authRouter from "../route/auth.js";
import fileUpload from "express-fileupload"
import cloudinary from "../cloudinary.js";

const web = express();

web.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
)

web.post("/upload", (req, res) => {
  const { photo } = req.files;

  if (!photo) {
    res.status(400).json({ status: 400, message: "Photo is required" });
  }

  cloudinary.v2.uploader.upload(
    photo.tempFilePath,
    {
      public_id: new Date().getTime(),
      folder: "destinations"
    },
    (error, result) => {
      if (error) {
        res.status(500).json({ status: 500, message: "upload failed", error });
      } else {
        res.json({ status: 200, message: "Success", result });
      }
    }
  );
});

web.use(express.json());
web.use(cors());
web.use(publicRouter);
web.use(authRouter);
web.use(errorMiddleware);

export default web;
