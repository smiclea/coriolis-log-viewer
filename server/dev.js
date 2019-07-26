// @flow

import webpack from 'webpack'
import webpackConfig from '../webpack.dev'

module.exports = (app: any) => {
  const compiler = webpack(webpackConfig)

  app.use(require('webpack-dev-middleware')(compiler, {
    stats: 'minimal',
    publicPath: webpackConfig.output.publicPath,
  }))

  app.use(require('webpack-hot-middleware')(compiler, {
    log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000,
  }))
}
