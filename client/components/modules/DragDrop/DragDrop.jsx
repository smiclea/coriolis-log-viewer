// @flow

import * as React from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react'

const Wrapper = styled.div``

const DraggingHighlight = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  border: 2px dotted;
  background: rgba(0, 0, 0, 0.3);
`
const Empty = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`

const readFromFileList = async (fileList: FileList): Promise<?string> => {
  if (!fileList.length) {
    return null
  }
  let file = fileList[0]
  let reader = new FileReader()
  return new Promise((resolve, reject) => {
    reader.onload = e => { resolve(e.target.result) }
    reader.onerror = e => { reject(e) }
    reader.readAsText(file)
  })
}

type Props = {
  onFileChange: (content: string) => void,
  showEmpty: boolean,
  children: React.Node,
}

type State = {
  highlightDropzone: boolean,
}

@observer
class DragDrop extends React.Component<Props, State> {
  state = {
    highlightDropzone: false,
  }

  dragDropListeners: { type: string, listener: (e: any) => any }[] = []

  componentWillMount() {
    this.addDragAndDrop()
  }

  componentWillUnmount() {
    this.removeDragDrop()
  }

  addDragAndDrop() {
    this.dragDropListeners = [{
      type: 'dragenter',
      listener: e => {
        this.setState({ highlightDropzone: true })
        e.dataTransfer.dropEffect = 'copy'
        e.preventDefault()
      },
    }, {
      type: 'dragover',
      listener: e => {
        e.dataTransfer.dropEffect = 'copy'
        e.preventDefault()
      },
    }, {
      type: 'dragleave',
      listener: e => {
        if (!e.clientX && !e.clientY) {
          this.setState({ highlightDropzone: false })
        }
      },
    }, {
      type: 'drop',
      listener: async e => {
        e.preventDefault()
        this.setState({ highlightDropzone: false })
        let text = await readFromFileList(e.dataTransfer.files)
        if (text) {
          this.props.onFileChange(text)
        }
      },
    }]

    this.dragDropListeners.forEach(l => {
      window.addEventListener(l.type, l.listener)
    })
  }

  removeDragDrop() {
    this.dragDropListeners.forEach(l => {
      window.removeEventListener(l.type, l.listener)
    })
    this.dragDropListeners = []
  }

  render() {
    return (
      <Wrapper dragging={this.state.highlightDropzone}>
        {this.props.showEmpty ? <Empty>Drop the `coriolis.log` file here.</Empty> : this.props.children}
        {this.state.highlightDropzone ? <DraggingHighlight /> : null}
      </Wrapper>
    )
  }
}

export default DragDrop
