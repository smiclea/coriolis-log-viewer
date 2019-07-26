const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const HappyPack = require('happypack')

const basename = process.env.LOG_VIEWER_BASENAME || ''

const outputPath = path.join(process.cwd(), 'dist')

module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|svg|woff2?|ttf|eot)$/,
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: './assets/[hash].[ext]',
        },
      },
      { test: /\.(t|j)sx?$/, loader: 'happypack/loader' },
    ],
  },
  output: {
    filename: '[name].js',
    path: outputPath,
    publicPath: `${basename}/`,
  },
  resolve: {
    modules: ['client', 'node_modules'],
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(process.cwd(), 'public/index.html'),
      basename,
    }),
    new webpack.ProgressPlugin(),
    new HappyPack({ loaders: ['babel-loader'] }),
  ],
}
