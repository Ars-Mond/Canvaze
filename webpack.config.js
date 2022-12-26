const path = require('path');

module.exports = {
	mode: 'production',
	devtool: 'source-map',
	entry: './index.ts',
	output: {
		path: path.resolve(__dirname, 'bundles'),
		filename: 'Canvaze.js',
		library: {
			name: 'Canvaze',
			type: 'var'
		},
		umdNamedDefine: true
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, '/src')
		},
		extensions: ['.ts', '.tsx', '.js']
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/
			}
		]
	}
};