module.exports = {
	globDirectory: 'dist/',
	globPatterns: [
		'**/*.{html,json,xml,ico,png,svg,js,txt,css}'
	],
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	],
	swDest: 'dist/sw.js'
};