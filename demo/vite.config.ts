import { defineConfig } from 'vite';
import copy from 'rollup-plugin-copy';
import * as path from 'path';

const paths = {
  production: `dist/assets/shoelace`,
  development: `shoelace`,
};
const mode = process.env.NODE_ENV || 'production';
const vitePath = `${paths[mode]}`;

export default defineConfig({
  build: {
    minify: true,
    cssCodeSplit: false,
    outDir: './dist',
    rollupOptions: {
      external: [/^node:.*/],

      plugins: [
        copy({
          targets: [
            {
              src: path.resolve(
                __dirname,
                'node_modules/@shoelace-style/shoelace/dist/assets',
              ),
              dest: path.resolve(__dirname, vitePath),
            },
          ],
          hook: 'writeBundle',
        }),
      ],
    },
  },
});
