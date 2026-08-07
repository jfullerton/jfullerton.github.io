import { defineConfig } from 'vite';
import autoprefixer from 'autoprefixer';

export default defineConfig({
  // Relative base so url() in CSS stays relative (../img/...)
  base: './',
  css: {
    postcss: {
      plugins: [autoprefixer()],
    },
  },
  build: {
    // outDir is swrpg/ so assetFileNames can reproduce the css/ and img/ layout;
    // bg-stars.png is re-emitted byte-identical over the existing file.
    outDir: 'swrpg',
    emptyOutDir: false,
    assetsInlineLimit: 0,
    rollupOptions: {
      input: 'swrpg/scss/crawl.scss',
      output: {
        assetFileNames: (assetInfo) => {
          const name = assetInfo.names?.[0] ?? '';
          if (name.endsWith('.css')) return 'css/crawl.css';
          return 'img/[name][extname]';
        },
      },
    },
  },
  plugins: [
    {
      // A CSS-only entry still emits a JS shim chunk; strip it from the bundle.
      name: 'strip-js-entry',
      generateBundle(_options, bundle) {
        for (const [fileName, output] of Object.entries(bundle)) {
          if (output.type === 'chunk' && fileName.endsWith('.js')) {
            delete bundle[fileName];
          }
        }
      },
    },
  ],
});
