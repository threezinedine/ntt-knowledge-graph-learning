const path = require('path');

module.exports = {
	entry: './ui/index.tsx',
	mode: 'development',
	output: {
		path: path.resolve(__dirname, 'dist-ui'),
		filename: 'index.js',
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.jsx'],
		alias: {
			'@': path.resolve('./', 'ui'),
		},
	},
	module: {
		rules: [
			{
				test: /\.(?:js|mjs|cjs|ts|tsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						targets: 'defaults',
						presets: [['@babel/preset-env'], '@babel/preset-react', '@babel/preset-typescript'],
					},
				},
			},
		],
	},
};
