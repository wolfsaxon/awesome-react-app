var webpack = require('webpack');

module.exports = {
    entry: [
        "webpack-dev-server/client?http://localhost:3000",
        "webpack/hot/dev-server",
        "./scripts/entry.jsx"
    ],
    output: {
        path: __dirname + '/public/',
        filename: "bundle.js",
        publicPath: "/" // Node server will map this to /public
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        //new webpack.optimize.UglifyJsPlugin(),
        //new webpack.optimize.DedupePlugin()
    ],
    resolve: {
        // Allow to omit extensions when requiring these files
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [
            { test: /\.jsx$/, loaders: ['react-hot', 'jsx-loader?harmony'], exclude: /(node_modules)/ }
        ]
    },
    externals: {
        // If Marked was not in node_modules (and included a script tag) we could tell webpack to resolve to its global
        //'marked': 'window.marked'
    }
};