const HtmlWebpackPlugin = require('html-webpack-plugin');

const path = require("path");

module.exports = {
    entry: {
        three: "./src",
    },
    mode: "development",
    output: {
        path: path.join(__dirname, "/dist"),
        filename: "bundle.js",
    },
    plugins: [new HtmlWebpackPlugin({
        title: 'Three JS Examples',
        favicon: './favicon.png',
        template: 'index.html'
    })],
    devServer: {
        https: true,
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(gltf)$/,
                use: [
                    {
                        loader: "gltf-webpack-loader",
                    },
                ],
            },
            {
                test: /\.(bin|png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {}
                    }
                ]
            }
        ],
    },
};
