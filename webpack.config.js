module.exports = {
	entry: './index.js',
	output: {
		path: __dirname + '/dist',
		filename: 'creed.js',
		library: 'creed',
		libraryTarget: 'umd'
	},
	watch: true,
	externals: {
		d3: true
	}
};