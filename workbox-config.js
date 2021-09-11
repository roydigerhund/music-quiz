module.exports = {
  globDirectory: 'dist/',
  globPatterns: ['**/*.{html,json,xml,ico,png,jpg,svg,js,txt,css}'],
  ignoreURLParametersMatching: [/^utm_/, /^fbclid$/],
  cacheId: 'music-quiz',
  swDest: 'dist/sw.js',
  cleanupOutdatedCaches: true,
	inlineWorkboxRuntime: true,
};
