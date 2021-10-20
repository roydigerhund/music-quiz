module.exports = {
  globDirectory: 'dist/',
  globPatterns: ['**/*.{html,json,xml,ico,png,jpg,svg,js,txt,css,mp3,m4a}'],
  ignoreURLParametersMatching: [/^utm_/, /^fbclid$/],
  cacheId: 'music-quiz',
  swDest: 'dist/sw.js',
  cleanupOutdatedCaches: true,
	inlineWorkboxRuntime: true,
};
