// module.exports = function override (config, env) {
//     console.log('override')
//     let loaders = config.resolve
//     loaders.fallback = {
//         "fs": false,
//         "tls": false,
//         "net": false,
//         "buffer": require.resolve("buffer/"),
//         "http": require.resolve("stream-http"),
//         "https": false,
//         "zlib": require.resolve("browserify-zlib") ,
//         "path": require.resolve("path-browserify"),
//         "stream": require.resolve("stream-browserify"),
//         "util": require.resolve("util/"),
//         "crypto": require.resolve("crypto-browserify")
//     }
    
//     return config
// }
const webpack = require("webpack")

module.exports = function override(config, env) {
    //do stuff with the webpack config...
    config.resolve.fallback = {
        ...config.resolve.fallback,
        stream: require.resolve("stream-browserify"),
        buffer: require.resolve("buffer"),
        crypto: require.resolve("crypto-browserify")
    }
    config.resolve.extensions = [...config.resolve.extensions, ".ts", ".js"]
    config.plugins = [
        ...config.plugins,
        new webpack.ProvidePlugin({
            process: "process/browser",
            Buffer: ["buffer", "Buffer"],
        }),
    ]
    // console.log(config.resolve)
    // console.log(config.plugins)

    return config
}