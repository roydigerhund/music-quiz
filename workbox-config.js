module.exports = {
  globDirectory: 'dist/',
  globPatterns: ['**/*.{html,json,xml,ico,png,jpg,svg,js,txt,css}'],
  ignoreURLParametersMatching: [/^utm_/, /^fbclid$/],
  cacheId: 'music-quiz-v0.1',
  swDest: 'dist/sw.js',
  cleanupOutdatedCaches: true,
  maximumFileSizeToCacheInBytes: 5000000,
};
