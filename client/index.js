// @flow

import 'core-js/stable'
import 'regenerator-runtime/runtime'

// $FlowIgnore
import 'react-hot-loader/patch'

import * as React from 'react'
import { render } from 'react-dom'
import { HashRouter, BrowserRouter } from 'react-router-dom'

import App from './components/App'

const renderApp = () => React.createElement(
  window.env.NODE_MODE === 'development' ? HashRouter : BrowserRouter,
  { basename: window.env.BASENAME },
  React.createElement(App, null),
)

const root = document.getElementById('app')
if (root) {
  render(renderApp(), root)
}

// $FlowIgnore
if (module.hot) {
  // $FlowIgnore
  module.hot.accept('./components/App.jsx', () => {
    require('./components/App.jsx')
    if (root) {
      render(renderApp(), root)
    }
  })
}
