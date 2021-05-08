const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
module.exports = {
    entry: './main.mjs',
    target: 'node14',
    mode: 'production',
    output: {
        path: path.resolve(__dirname, 'api'),
        filename: 'index.js',
        libraryTarget: 'module',
        publicPath: './'
    },
    experiments: {
        outputModule: true,
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    format: {
                        comments: false,
                    },
                },
                extractComments: false,
            }),
        ],
    },
}
