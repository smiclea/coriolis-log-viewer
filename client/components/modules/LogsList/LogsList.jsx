// @flow

import * as React from 'react'
import styled, { css } from 'styled-components'
import { observer } from 'mobx-react'

import type { LogRequestUI, LogMeta } from '../../../../types/Log'

const Wrapper = styled.div``
const LogsHeader = styled.div`
  display: flex;
  margin-bottom: 16px;
  font-size: 15px;
`
const LogsHeaderColumn = styled.div`
  width: ${props => `calc(${props.ratio}% - 16px)`};
  font-weight: bold;
  margin-right: 16px;
`
const LogsBody = styled.div``
const LogRow = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
`
const LogColumns = styled.div`
  display: flex;
`
const LogColumn = styled.div`
  width: ${props => `calc(${props.ratio}% - 16px)`};
  ${props => props.color ? css`color: ${props.color};` : ''}
  ${props => props.pointer ? css`cursor: pointer;` : ''}
  word-break: break-all;
  margin-right: 16px;
  display: flex;
`
const MoreInfo = styled.div`
  color: blue;
  cursor: pointer;
  margin-right: 8px;
  min-width: 10px;
  max-width: 10px;
`
const LogDetails = styled.div`
  font-size: 12px;
  background: rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: all cubic-bezier(0.165, 0.84, 0.44, 1) 0.4s;
  ${props => props.open ? css`
    height: auto;
    padding: 8px;
    margin-top: 8px;
  ` : css`
    height: 0;
    padding: 0;
    margin-top: 0;
  `}
`
const LogDetail = styled.div`
  display: flex;
  margin-bottom: 8px;
`
const LogDetailHeader = styled.div`
  font-weight: bold;
  width: 150px;
`
const LogDetailValue = styled.div`
  pre {
    margin: 0;
  }
`
const MetaHeader = styled.div`
  margin-bottom: 32px;
  background: rgba(255, 255, 0, 0.2);
  padding: 16px;
`
const MetaHeaderData = styled.div`
  display: flex;
`
const MetaHeaderLabel = styled.div`
  font-weight: bold;
  margin-right: 8px;
`
const MetaHeaderValue = styled.div``

type Props = {
  requests: LogRequestUI[],
  meta: ?LogMeta,
}
type State = {
  openedIds: string[],
}

@observer
class LogsList extends React.Component<Props, State> {
  state = {
    openedIds: [],
  }

  handleMoreInfo(l: LogRequestUI) {
    let id = `${l.url}${l.requestDate}${l.responseDate}`
    let foundId = this.state.openedIds.find(i => i === id)
    if (foundId) {
      this.setState({
        openedIds: this.state.openedIds.filter(i => i !== id),
      })
    } else {
      this.setState({
        openedIds: [...this.state.openedIds, id],
      })
    }
  }

  renderMetaData() {
    if (!this.props.meta) {
      return null
    }

    return (
      <MetaHeader>
        <MetaHeaderData>
          <MetaHeaderLabel>UI Version</MetaHeaderLabel>
          <MetaHeaderValue>{this.props.meta.version}</MetaHeaderValue>
        </MetaHeaderData>
        <MetaHeaderData>
          <MetaHeaderLabel>Platform</MetaHeaderLabel>
          <MetaHeaderValue>{this.props.meta.platform}</MetaHeaderValue>
        </MetaHeaderData>
        <MetaHeaderData>
          <MetaHeaderLabel>Browser</MetaHeaderLabel>
          <MetaHeaderValue>{this.props.meta.userAgent}</MetaHeaderValue>
        </MetaHeaderData>
      </MetaHeader>
    )
  }

  render() {
    let colummnsRatios = [50, 10, 23, 17]
    let columnNames = ['Request', 'Status', 'Window', 'Sent at']

    return (
      <Wrapper>
        {this.renderMetaData()}
        <LogsHeader>
          {columnNames.map((n, i) => (
            <LogsHeaderColumn key={n} ratio={colummnsRatios[i]}>{n}</LogsHeaderColumn>
          ))}
        </LogsHeader>
        <LogsBody>
          {this.props.requests.map(l => {
            let id = `${l.url}${l.requestDate}${l.responseDate}`
            let open = this.state.openedIds.find(idx => idx === id)
            return (
              <LogRow key={id}>
                <LogColumns>
                  <LogColumn
                    ratio={colummnsRatios[0]}
                    onClick={() => { this.handleMoreInfo(l) }}
                    pointer
                  >
                    <MoreInfo>{open ? '-' : '+'}</MoreInfo>
                    <span>[{l.method}] {l.url}</span>
                  </LogColumn>
                  <LogColumn ratio={colummnsRatios[1]} color={Number(l.requestStatus) >= 400 ? 'red' : ''}>
                    {l.requestStatus}
                  </LogColumn>
                  <LogColumn ratio={colummnsRatios[2]}>
                    {l.windowPath || '-'}
                  </LogColumn>
                  <LogColumn ratio={colummnsRatios[3]}>
                    {l.requestDate}
                  </LogColumn>
                </LogColumns>
                <LogDetails open={open}>
                  <LogDetail>
                    <LogDetailHeader>Response Time</LogDetailHeader>
                    <LogDetailValue>
                      {l.responseDate}
                      {l.responseDate ? ` (${new Date(l.responseDate).getTime() - new Date(l.requestDate).getTime()} ms)` : ''}
                    </LogDetailValue>
                  </LogDetail>
                  {l.description ? (
                    <LogDetail>
                      <LogDetailHeader>Description</LogDetailHeader>
                      <LogDetailValue>{l.description}</LogDetailValue>
                    </LogDetail>
                  ) : null}
                  {l.requestError ? (
                    <LogDetail>
                      <LogDetailHeader>Request Error</LogDetailHeader>
                      <LogDetailValue>{JSON.stringify(l.requestError)}</LogDetailValue>
                    </LogDetail>
                  ) : null}
                  <LogDetail>
                    <LogDetailHeader>Stack</LogDetailHeader>
                    <LogDetailValue dangerouslySetInnerHTML={{
                      __html: `<pre>${l.stack.replace('Error', 'Logged').replace(/(?:\r\n|\r|\n)/g, '<br />')}</pre>`,
                    }}
                    />
                  </LogDetail>
                </LogDetails>
              </LogRow>
            )
          })}
        </LogsBody>
      </Wrapper>
    )
  }
}

export default LogsList
