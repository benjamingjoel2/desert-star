// Builds right-sized AVIF + WebP variants from src-images/ into public/img/
// and writes data/images.json with each image's intrinsic size.
import sharp from "sharp";
import { readdir, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const SRC = "src-images";
const OUT = "public/img";
const WIDTHS = [640, 1080, 1600, 2400];
await mkdir(OUT, { recursive: true });
const meta = {};
for (const file of (await readdir(SRC)).sort()) {
  if (!/\.(jpe?g|png|webp)$/i.test(file)) continue;
  const name = file.replace(/\.[^.]+$/, "");
  const img = sharp(path.join(SRC, file)).rotate();
  const { width, height } = await img.metadata();
  const widths = WIDTHS.filter((w) => w < width).concat(width < 2400 ? [width] : []);
  for (const w of widths) {
    const r = img.clone().resize({ width: w });
    await r.clone().avif({ quality: 64 }).toFile(`${OUT}/${name}-${w}.avif`);
    await r.clone().webp({ quality: 84 }).toFile(`${OUT}/${name}-${w}.webp`);
  }
  meta[name] = { w: width, h: height, widths };
}
await writeFile("data/images.json", JSON.stringify(meta, null, 1));
console.log(Object.keys(meta).length, "images");
