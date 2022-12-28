const path = require('path');

module.exports = {
	mode: 'production',
	entry: './index.ts',
	output: {
		path: path.resolve(__dirname, 'bundles'),
		filename: 'Canvaze.js',
		library: {
			name: 'Canvaze',
			type: 'assign'
		},
		umdNamedDefine: true
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src'),
			'@g': path.resolve(__dirname, 'src/graphics'),
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