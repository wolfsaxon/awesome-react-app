var webpack = require('webpack');
var config = require('./webpack.config');

config.entry = [
    "./scripts/entry.jsx"
];

config.output = {
    path: __dirname + '/public/',
    filename: "bundle.js",
    publicPath: "/" // Node server will map this to /public
};

config.plugins = [
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.DedupePlugin()  
];

module.exports = config;