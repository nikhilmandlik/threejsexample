const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: {
        three: './src/index.js',
    },
    mode: 'development',
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'bundle.js',
    },
    devServer: {
        https: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'index.html'),
            title: 'My App',
            filename: 'index.html'
        }),
        new CopyPlugin(
            [
                {
                    from: path.join(__dirname, '/src/assets'),
                    to: path.join(__dirname, '/dist/assets')
                }
            ]
        ),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[name].css'
        })
    ],
    module: {
        rules: [
            {
                test: /\.(sc|sa|c)ss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.(gltf)$/,
                use: [
                    {
                        loader: 'gltf-webpack-loader',
                        options: {
                            name: '[name].[ext]'
                        }
                    },
                ],
            },
            {
                test: /\.(bin|png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]'
                        }
                    }
                ]
            }
        ],
    },
};
