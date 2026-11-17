import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

// The Figma to code page, built into Storybook's output so it deploys with it:
// air.markofucek.com/figma-to-code/. `npm run build` runs this after `storybook build`.
export default defineConfig({
  root: fileURLToPath(new URL('.', import.meta.url)),
  base: '/figma-to-code/',
  plugins: [react()],
  build: {
    outDir: fileURLToPath(new URL('../storybook-static/figma-to-code', import.meta.url)),
    emptyOutDir: true,
  },
  server: { port: 6008 },
  preview: { port: 6008 },
});
