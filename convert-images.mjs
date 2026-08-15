// Image optimization script: Convert all JPEGs to WebP
import sharp from 'sharp';
import { readdirSync, writeFileSync } from 'fs';
import { join } from 'path';

const imagesDir = join(process.cwd(), 'public', 'images');
const files = readdirSync(imagesDir).filter(f => f.endsWith('.jpg'));

console.log(`Found ${files.length} JPEG files to convert...`);

let totalOriginal = 0;
let totalWebp = 0;

for (const file of files) {
  const inputPath = join(imagesDir, file);
  const outputPath = join(imagesDir, file.replace('.jpg', '.webp'));
  
  try {
    const input = await sharp(inputPath);
    const metadata = await input.metadata();
    const originalSize = (await input.toBuffer()).length;
    
    // Resize if wider than 1920px to cap resolution
    const maxWidth = 1920;
    const resizeOpts = (metadata.width && metadata.width > maxWidth) ? { width: maxWidth } : {};
    
    const webpBuffer = await sharp(inputPath)
      .resize(resizeOpts)
      .webp({ quality: 80 })
      .toBuffer();
    
    writeFileSync(outputPath, webpBuffer);
    
    totalOriginal += originalSize;
    totalWebp += webpBuffer.length;
    
    const savings = ((1 - webpBuffer.length / originalSize) * 100).toFixed(1);
    console.log(`  ✓ ${file} (${(originalSize/1024).toFixed(0)}KB) → ${file.replace('.jpg','.webp')} (${(webpBuffer.length/1024).toFixed(0)}KB) — ${savings}% smaller`);
  } catch (err) {
    console.error(`  ✗ Failed: ${file}`, err);
  }
}

console.log(`\nDone! Total: ${(totalOriginal/1024/1024).toFixed(1)}MB → ${(totalWebp/1024/1024).toFixed(1)}MB (${((1-totalWebp/totalOriginal)*100).toFixed(0)}% reduction)`);
