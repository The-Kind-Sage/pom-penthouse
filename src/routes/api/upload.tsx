import { createFileRoute } from "@tanstack/react-router";
import { uploadImage } from "@/lib/cloudinary";

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

          // Try Cloudinary first, fall back to base64 data URI
          try {
            const result = await uploadImage(file, folder);
            return new Response(JSON.stringify({ success: true, url: result.url, public_id: result.public_id }), {
              status: 200,
              headers: { "Content-Type": "application/json" },
            });
          } catch {
            // Cloudinary not configured — store as base64 data URI
            const bytes = await file.arrayBuffer();
            const base64 = Buffer.from(bytes).toString("base64");
            const mimeType = file.type || "image/jpeg";
            const dataUri = `data:${mimeType};base64,${base64}`;
            return new Response(JSON.stringify({ success: true, url: dataUri, public_id: "" }), {
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
