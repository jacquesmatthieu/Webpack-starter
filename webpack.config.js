const path = require('path');
const root = path.resolve(__dirname);
const ExtractTextPlugin = require("extract-text-webpack-plugin");



module.exports = {
    entry: {
        app: ['./app/assets/js/main.js']
    },

    output: {
        path: path.resolve(__dirname, './dist/assets/js'),
        filename: 'bundle.js'
    },

    module: {
        rules: [{
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            include: root
        }, {
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader', 'sass-loader']
            })
        }]
    },

    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        stats: "errors-only",
        open: true
    },

    plugins: [
        new ExtractTextPlugin({
            filename: '../css/main.css',
            disable: false,
            allChunks: true
        })
    ]
}
