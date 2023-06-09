const webpack = require("webpack");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const path = require("path");

const root = path.resolve(__dirname, "..");

const resolve = (...parts) => path.resolve(root, ...parts);

module.exports = (dev = true) => ({
	name: "app",
	mode: dev ? "development" : "production",
	entry: resolve("src/app/index.tsx"),
	stats: "minimal",
	target: "node",
	devtool: "inline-source-map",
	output: {
		path: resolve("dist"),
		filename: "[name].js"
	},
	resolve: {
		extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
		plugins: [new TsconfigPathsPlugin({})]
	},
	plugins: [
		new webpack.ProvidePlugin({
			env: JSON.stringify({
				isDev: dev
			})
		})
	],
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				exclude: /(node_modules|build)/,
				use: "ts-loader"
			},
			{
				test: /\.js$/,
				use: "source-map-loader",
				enforce: "pre"
			}
		]
	}
});