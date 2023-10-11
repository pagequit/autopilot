const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { name } = require("./package.json");

module.exports = {
    mode: "development",
    entry: {
        index: "./index.ts",
    },
    devtool: "inline-source-map",
    devServer: {
        static: "static",
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: name,
        }),
    ],
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "static"),
        clean: true,
        publicPath: "/",
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: ["ts-loader"],
                exclude: /node_modules/,
            },
            {
                test: /\.s[ac]ss$/,
                use: ["style-loader", "css-loader", "sass-loader"],
            },
        ],
    },
};
