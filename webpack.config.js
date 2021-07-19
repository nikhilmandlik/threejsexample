const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");


module.exports = {
    entry: {
        three: "./src",
    },
    mode: "development",
    output: {
        path: path.join(__dirname, "/dist"),
        filename: "bundle.js",
    },
    devServer: {
        https: true,
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                {
                    from: path.join(__dirname, "/src/assets"),
                    to: path.join(__dirname, "/dist/assets")
                },
            ],
        }),
    ],
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
                        options: {
                            name: '[path][name].[ext]',
                            esModule: false
                        }
                    }
                ]
            },
        ],
    },
};
