// svelte.config.js:
const sveltePreprocess = require('svelte-preprocess');

// using sourceMap as an example, but could be anything you need dynamically
function createPreprocessors(sourceMap) {
    return sveltePreprocess({
      sourceMap,
      scss: {
        includePaths: ['src'],
      },
      postcss: {
        plugins: [require('autoprefixer')],
      },
    });
}

module.exports = {
    preprocess: createPreprocessors(true),
    createPreprocessors
};