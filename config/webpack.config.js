const   path = require('path'),
        root = path.resolve(__dirname),
        ExtractTextPlugin = require("extract-text-webpack-plugin")

module.exports = {
    entry: {
        app: ['../app/assets/js/main.js']
    },

    output: {
        path: path.resolve(__dirname, '../dist/assets/js'),
        filename: 'bundle.js'
    },

    module: {
        rules: [

            {
                enforce: 'pre',
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: "eslint-loader",
                include: root
            }, {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: ['babel-loader'],
                include: root
            },

            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            }
        ]
    },

    devServer: {
        hot: true,
        compress: true,
        port: 80,
        stats: {chunks: false}
    },

    plugins: [new ExtractTextPlugin({filename: '../css/main.css', disable: false, allChunks: true})]
}
