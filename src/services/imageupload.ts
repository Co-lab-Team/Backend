const path = require("path");
const cloudinary = require("cloudinary");
const DataUri = require("datauri/parser");

import "dotenv/config";

export const cloudinaryService = async (
  file: any,
  service: any
): Promise<{ successful: boolean; message: string; urls: any[] }> => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    const urls = [];

    const dtauri = new DataUri();

    // Loop removed since there's only one file
    const dataUri = dtauri.format(path.extname(file.originalname), file.buffer);

    const final_file = dataUri.content;

    const image = await cloudinary.v2.uploader.upload_large(final_file);

    urls.push(image.secure_url);

    return { successful: true, message: "file uploaded successfully", urls };
  } catch (error) {
    return { successful: false, message: (error as Error).message, urls: [] };
  }
};

// delete image from cloudinary
export const deleteImage = async (public_id: string) => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    const result = await cloudinary.v2.uploader.destroy(public_id);

    return { successful: true, message: "file deleted successfully", result };
  } catch (error) {
    return { successful: false, message: (error as Error).message, result: {} };
  }
};

// save zip files to the template folder
export const uploadTemplate = async (
  file: any,
  service: any
): Promise<{
  successful: boolean;
  message: string;
  url?: string;
  size?: any;
}> => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    const dtauri = new DataUri();
    const dataUri = dtauri.format(path.extname(file.originalname), file.buffer);
    const finalFile = dataUri.content;

    const result = await cloudinary.v2.uploader.upload_large(finalFile, {
      folder: "template", // Specify the folder where you want to save the zip file
    });

    const url = result.secure_url;
    const size = result.secure.bytes;

    return {
      successful: true,
      message: "Zip file uploaded successfully",
      url,
      size,
    };
  } catch (error) {
    return { successful: false, message: (error as Error).message };
  }
};
