const webpack = require("webpack"),
path = require("path"),
cleanwebpackplugin = require("clean-webpack-plugin"),
extractplugin = require("extract-text-webpack-plugin");


module.exports = {
    entry : ['./public/src/js/app.js', './public/src/css/main.css'],
    output : {
        path: path.resolve(__dirname, 'public/dist/js'),
        filename : 'app.bundle.js'
    },
    plugins : [
        new cleanwebpackplugin('[public/dist/js]'), 
        new extractplugin({
            filename: '../css/main.css'
        })
    ],
    module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['env']
              }
            }
          },
          {
            test: /\.css$/,
            loader: extractplugin.extract(['css-loader'])
        }
        ]
      }
}
