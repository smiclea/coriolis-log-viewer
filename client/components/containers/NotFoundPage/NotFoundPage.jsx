// @flow

import React from 'react'
import styled from 'styled-components'

import Style from '../../../utils/Style'

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const Title = styled.div`
  font-size: 21px;
  color: ${Style.palette.grayscale[4]};
`
const Message = styled.div`
  margin-top: 16px;
  color: ${Style.palette.grayscale[8]};
`

const NotFoundPage = () => {
  return (
    <Wrapper>
      <Title>Page Not Found</Title>
      <Message>Sorry, but the page you are trying to view does not exist.</Message>
    </Wrapper>
  )
}

export default NotFoundPage
