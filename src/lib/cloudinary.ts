import { v2 as cloudinary } from "cloudinary";

const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;
const isConfigured = !!(cloudName && apiKey && apiSecret);

if (isConfigured) {
  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
    secure: true,
  });
} else {
  console.warn("[cloudinary] Not configured — set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET env vars");
}

export { cloudinary };

export async function uploadImage(file: File, folder = "pom-penthouse") {
  if (!isConfigured) throw new Error("Cloudinary not configured — add CLOUDINARY_* env vars in Vercel");

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  return new Promise<{ url: string; public_id: string }>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
        transformation: [{ quality: "auto", fetch_format: "auto" }],
      },
      (error, result) => {
        if (error) reject(error);
        else resolve({ url: result!.secure_url, public_id: result!.public_id });
      },
    );
    stream.end(buffer);
  });
}

export async function deleteImage(publicId: string) {
  if (!isConfigured) throw new Error("Cloudinary not configured");
  return cloudinary.uploader.destroy(publicId);
}
