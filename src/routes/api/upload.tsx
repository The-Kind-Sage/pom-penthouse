import { createFileRoute } from "@tanstack/react-router";
import { uploadImage } from "@/lib/cloudinary";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";

export const Route = createFileRoute("/api/upload")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const formData = await request.formData();
          const file = formData.get("file") as File | null;
          const folder = (formData.get("folder") as string) || "pom-penthouse";

          if (!file) {
            return new Response(JSON.stringify({ success: false, error: "No file provided" }), {
              status: 400,
              headers: { "Content-Type": "application/json" },
            });
          }

          if (file.size > 10 * 1024 * 1024) {
            return new Response(JSON.stringify({ success: false, error: "File too large (max 10MB)" }), {
              status: 400,
              headers: { "Content-Type": "application/json" },
            });
          }

          // Generate unique filename
          const timestamp = Date.now();
          const randomStr = Math.random().toString(36).substring(2, 8);
          const extension = file.name.split('.').pop() || 'jpg';
          const filename = `${timestamp}-${randomStr}.${extension}`;

          // Save to local public/assets folder
          const assetsDir = join(process.cwd(), "public", "assets");
          if (!existsSync(assetsDir)) {
            await mkdir(assetsDir, { recursive: true });
          }
          const localPath = join(assetsDir, filename);
          const bytes = await file.arrayBuffer();
          const buffer = Buffer.from(bytes);
          await writeFile(localPath, buffer);
          const localUrl = `/assets/${filename}`;

          // Try Cloudinary first, fall back to local path
          try {
            const result = await uploadImage(file, folder);
            return new Response(JSON.stringify({ 
              success: true, 
              url: result.url, 
              public_id: result.public_id,
              local_url: localUrl 
            }), {
              status: 200,
              headers: { "Content-Type": "application/json" },
            });
          } catch {
            // Cloudinary not configured — use local path
            return new Response(JSON.stringify({ 
              success: true, 
              url: localUrl, 
              public_id: "",
              local_url: localUrl 
            }), {
              status: 200,
              headers: { "Content-Type": "application/json" },
            });
          }
        } catch (err: any) {
          return new Response(JSON.stringify({ success: false, error: err?.message || "Upload failed" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
          });
        }
      },
    },
  },
});
