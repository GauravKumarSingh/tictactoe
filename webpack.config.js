const HTMLWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/main.js',
    devtool: 'source-map',
    output: {
        filename: 'main.bundle.js',
    },
    plugins: [
        new HTMLWebpackPlugin({
            'template': path.resolve(__dirname,'./src/index.html')
        })
    ],
    module:{
        rules: [
            {
                test: /\.?js$/,
                exclude: /node_modules/,
                use:{
                    loader:"babel-loader",
                    options:{
                        presets: ["@babel/preset-env",["@babel/preset-react",{"runtime": "automatic"}]]
                    }
                }
            },
            {
                test: /\.less$/,
                use: [
                    { loader: 'style-loader' },
                    { loader: 'css-loader' },
                    { loader: 'less-loader' }
                ]
            }
        ]
    },
    devServer: {
        port: 3000,
        hot: true,
        open: true
    }

}