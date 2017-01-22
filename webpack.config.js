var webpack = require('webpack');

module.exports = {
    entry: './src/client/components/app',
    output: {
        // Output the bundled file.
        path: __dirname + '/public',
        // Use the name specified in the entry key as name for the bundle file.
        filename: 'main.js'
    },
    devtool: "source-map",
    module: {
        loaders: [
            {
                // Test for js or jsx files.
                test: /\.tsx?$/,
                exclude: /node_modules/,
                loader: 'awesome-typescript-loader',
                query:
                {
                    presets:['es2015','react']
                }
            },
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            {
                test: /\.js$/,
                loader: "source-map-loader",
                enforce: 'pre'
            }
        ],

    },
    externals: {
      "react": "React",
        "react-dom": "ReactDOM"
    },
    resolve: {
        // Include empty string '' to resolve files by their explicit extension
        // (e.g. require('./somefile.ext')).
        // Include '.js', '.jsx' to resolve files by these implicit extensions
        // (e.g. require('underscore')).
        extensions: ['.js', ".webpack.js", ".web.js", ".ts", ".tsx"]
    }
};