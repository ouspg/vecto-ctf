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
            { "test": /\.js$/, "loader": "babel?presets[]=es2015" }
        ]
    },
    "devtool": "source-map",
    "plugins": [
        new webpack.optimize.UglifyJsPlugin({
            "compress": {
                "warnings": false
            }
        })
    ]
};
