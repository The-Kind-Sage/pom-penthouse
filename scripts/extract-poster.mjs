/**
 * extract-poster.mjs
 * Extracts the first frame of public/assets/video1.mp4 as a JPEG poster image.
 * Uses ffmpeg-static (bundled binary — no system FFmpeg required).
 *
 * Run once:  node scripts/extract-poster.mjs
 */

import ffmpeg from "fluent-ffmpeg";
import ffmpegPath from "ffmpeg-static";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const input = path.join(root, "public", "assets", "video1.mp4");
const output = path.join(root, "public", "assets", "video1-poster.jpg");

if (!fs.existsSync(input)) {
  console.error(`✗  Video not found: ${input}`);
  process.exit(1);
}

if (fs.existsSync(output)) {
  console.log(`✓  Poster already exists at ${output} — skipping.`);
  process.exit(0);
}

// Point fluent-ffmpeg at the bundled static binary
ffmpeg.setFfmpegPath(ffmpegPath);

console.log("⏳  Extracting first frame from video1.mp4 …");

ffmpeg(input)
  .outputOptions([
    "-vframes 1",      // extract exactly one frame
    "-q:v 4",          // JPEG quality 4 — good quality, smaller file than q:v 2
    "-vf scale=960:-2", // half-width (960px) — plenty for a brief loading poster
  ])
  .output(output)
  .on("end", () => {
    const size = fs.statSync(output).size;
    console.log(`✓  Poster saved → ${output}  (${(size / 1024).toFixed(1)} KB)`);
  })
  .on("error", (err) => {
    console.error("✗  FFmpeg error:", err.message);
    process.exit(1);
  })
  .run();
