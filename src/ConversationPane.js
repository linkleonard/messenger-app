import React from 'react';
import styled from 'styled-components/macro';

import MessageList from './MessageList';
import NewMessageForm from './NewMessageForm';

const Wrapper = styled.div`
  display: flex;
  flex: 1 0 auto;
  flex-flow: column;
`


const ConversationPane = ({ conversation }) => (
  <Wrapper>
    <MessageList conversation={conversation} />
    <NewMessageForm />
  </Wrapper>
)

export default ConversationPane;
