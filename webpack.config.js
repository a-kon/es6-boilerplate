const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
	mode: process.env.NODE_ENV,
	module: {
		rules: [
			{
				test: /\.js?$/,
				include: [
					path.resolve(__dirname, "src"),
				],
				loader: "babel-loader",
				options: {
					presets: ["es2015"]
				},
			},
			{
				test: /\.css$/,
				include: [
					path.resolve(__dirname, "src"),
				],
				use: [
					MiniCssExtractPlugin.loader,
					// { loader: "style-loader" },
					{ loader: "css-loader" },
				]
			},
			{
				test: /\.html$/,
				include: [
					path.resolve(__dirname, "src/index.html"),
				],
				use: [{
					loader: 'html-loader',
					options: {
						minimize: true
					}
				}]
			}
		]
	},
	resolve: {
		modules: ["node_modules"],
		extensions: [".js", ".json", ".css"],
		alias: {
			"src": path.resolve(__dirname, "./src"),
		}
	},
	devServer: {
		proxy: {
			'/api': 'http://localhost:3000'
		},
		contentBase: path.join(__dirname, 'public'),
		compress: true,
		historyApiFallback: true,
		hot: false,
		https: false,
		noInfo: true,
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'ES-6 boilerplate',
			filename: 'index.html'
		}),
		new MiniCssExtractPlugin()
	]
}