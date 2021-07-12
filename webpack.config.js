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
