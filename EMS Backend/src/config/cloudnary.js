import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import { logger } from "../shared/logger.js";
import streamifier from "streamifier";
dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,

})
export const uploadMedia = async (fileBuffer, folder, cb) => {
  const stream = cloudinary.uploader.upload_stream(
    { folder, resource_type: "auto" },
    (error, result) => {
      cb(error, result);
    }
  );
  streamifier.createReadStream(fileBuffer).pipe(stream);
};
export const deleteMediaFromCloudinary = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    logger.error("Cloudinary upload error:", error);
  }
};