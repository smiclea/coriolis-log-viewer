// @flow

import * as React from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import { Switch, Route } from 'react-router-dom'
import { observer } from 'mobx-react'

import NotFoundPage from './containers/NotFoundPage'
import LogViewerPage from './containers/LogViewerPage'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-size: 14px;
    font-family: Rubik;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`
const Wrapper = styled.div``

@observer
class App extends React.Component<{}> {
  render() {
    return (
      <Wrapper>
        <Switch>
          <Route path="/" component={LogViewerPage} exact />
          <Route component={NotFoundPage} />
        </Switch>
        <GlobalStyle />
      </Wrapper>
    )
  }
}

export default App
