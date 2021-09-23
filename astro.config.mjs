import fetch from 'node-fetch';

// @ts-check
export default /** @type {import('astro').AstroUserConfig} */ ({
  devOptions: {
    tailwindConfig: './tailwind.config.js'
  },
  buildOptions: {
    site: 'https://pauliescanlon.github.io/'
  },
  renderers: ['@astrojs/renderer-react'],
  injectGlobals: (() => {
    globalThis.fetch = fetch;
  })() //IIFE, the name of the fn is not important but it should not collide with any supported config property
});
