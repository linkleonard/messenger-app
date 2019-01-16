import React from 'react';
import MessageList from './MessageList';
import NewMessageForm from './NewMessageForm';

const ConversationPane = (props) => (
  <div>
    <MessageList />
    <NewMessageForm />
  </div>
)

export default ConversationPane;
