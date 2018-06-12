const webpack = require('webpack')
const path = require('path')

module.exports = {
    entry: './src/gim.js',
    output: {
        library: 'gim',
        libraryTarget: 'umd',
        libraryExport: 'default',
        filename: 'gim.js',
        path: path.resolve(__dirname, 'dist')
    },
    node: {
        global: false
    },
    plugins: [new webpack.DefinePlugin({
        global: 'window'
    })]
}