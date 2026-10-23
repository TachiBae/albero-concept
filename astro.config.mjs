// @ts-check
import { defineConfig } from 'astro/config';
import { readdir, readFile, rm, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import tailwindcss from '@tailwindcss/vite';

// Photo.astro imports every public/images file so astro:assets can resize it,
// which makes Vite copy all ~240 originals into dist/_astro. Delete the image
// files no built page, stylesheet or script references.
function pruneUnusedImages() {
  return {
    name: 'prune-unused-images',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const root = fileURLToPath(dir);
        const files = (await readdir(root, { recursive: true })).map((f) => path.join(root, f));
        const text = (
          await Promise.all(files.filter((f) => /\.(html|css|js|mjs|json|xml|txt)$/.test(f)).map((f) => readFile(f, 'utf8')))
        ).join('\n');
        let count = 0;
        let bytes = 0;
        for (const f of files) {
          if (!f.startsWith(path.join(root, '_astro')) || !/\.(jpe?g|png|webp|avif)$/i.test(f)) continue;
          if (text.includes(path.basename(f))) continue;
          bytes += (await stat(f)).size;
          await rm(f);
          count++;
        }
        logger.info(`removed ${count} unreferenced images (${(bytes / 1048576).toFixed(1)} MB)`);
      },
    },
  };
}

// https://astro.build/config
export default defineConfig({
  integrations: [pruneUnusedImages()],
  vite: {
    plugins: [tailwindcss()]
  }
});
