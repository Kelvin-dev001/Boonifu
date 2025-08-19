import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function uploadImageToCloudinary(buffer: Buffer, public_id: string): Promise<string> {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          resource_type: "image",
          public_id,
        },
        (error, result) => {
          if (error || !result) {
            reject(error || new Error("No result from Cloudinary"));
          } else {
            resolve(result.secure_url);
          }
        }
      )
      .end(buffer);
  });
}