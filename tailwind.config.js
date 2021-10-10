module.exports = {
  mode: 'jit',
  purge: ['./public/**/*.html', './src/**/*.{astro,tsx}'],
  theme: {
    extend: {
      gridTemplateColumns: {
        auto1fr: 'auto 1fr'
      }
    }
  }
};
