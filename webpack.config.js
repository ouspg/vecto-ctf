var webpack = require("webpack");

module.exports = {
    "entry": "./src/app.js",
    "output": {
        "path": "./build",
        "filename": "bundle.js",
        "publicPath": "/build/"
    },
    "module": {
        "loaders": [
            { "test": /\.css$/, "loader": "style!css" },
            {
                "test": /\.jsx?$/,
                "loader": "babel",
                "exclude": /node_modules/,
                "query": {
                    "presets": ["es2015", "react"]
                }
            }
        ]
    },
    "devtool": "source-map",
    "plugins": [
        new webpack.optimize.UglifyJsPlugin({
            "compress": {
                "warnings": false
            }
        }),
        new webpack.DefinePlugin({
            "process.env": {
                "NODE_ENV": JSON.stringify("production")
            }
        })
    ]
};
