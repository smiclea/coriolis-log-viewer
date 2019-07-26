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
    logStore.loadLogs()
  }

  handleFileChange(content: string) {
    logStore.saveLogs(JSON.parse(content))
  }

  render() {
    return (
      <Wrapper>
        <DragDrop
          onFileChange={content => { this.handleFileChange(content) }}
          showEmpty={logStore.logs.length === 0}
        >
          <LogsList logs={logStore.logs} />
        </DragDrop>
      </Wrapper>
    )
  }
}

export default LogViewerPage
