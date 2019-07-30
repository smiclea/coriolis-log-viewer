// @flow

import * as React from 'react'
import { observer } from 'mobx-react'
import styled from 'styled-components'

import logStore from '../../../stores/LogStore'

import DragDrop from '../../modules/DragDrop'
import LogsList from '../../modules/LogsList'

const Wrapper = styled.div`
  padding: 16px;
`

type Props = {}

@observer
class LogViewerPage extends React.Component<Props> {
  componentWillMount() {
    logStore.loadLog()
  }

  handleFileChange(content: string) {
    logStore.saveLog(JSON.parse(content))
  }

  render() {
    return (
      <Wrapper>
        <DragDrop
          onFileChange={content => { this.handleFileChange(content) }}
          showEmpty={logStore.requests.length === 0}
        >
          <LogsList
            requests={logStore.requests}
            meta={logStore.meta}
          />
        </DragDrop>
      </Wrapper>
    )
  }
}

export default LogViewerPage
