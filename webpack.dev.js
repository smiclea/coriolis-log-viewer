/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-var-requires */

var merge = require('webpack-merge')
var path = require('path')
var webpack = require('webpack')
var common = require('./webpack.common')

const sourcePath = path.join(process.cwd(), 'client')

module.exports = merge(common, {
  mode: 'development',
  entry: {
    app: [sourcePath, 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000'],
  },
  devtool: 'eval-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
})
