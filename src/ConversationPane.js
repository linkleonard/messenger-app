import React from 'react';
import graphql from 'babel-plugin-relay/macro';
import { createFragmentContainer } from 'react-relay';
import styled from 'styled-components/macro';

import CurrentUserContext from './CurrentUserContext';
import ChatSenderIcon from './ChatSenderIcon';
import Message from './Message';


const ConversationContainer = styled.div`
  flex: 1 0 auto;
  display: flex;

  flex-flow: column;
  align-items: center;
  justify-content: flex-end;
  padding: 10px;

`;

const SenderMessageGroup = styled.div`
  flex: 0 1 auto;

  display: inline-flex;

  flex-flow: row;
  align-self: ${({isSender}) => isSender ? "flex-end": "flex-start"};
  align-items: flex-start;

  padding: 20px;

  font-size: 1.3em;
  text-align: ${({isSender}) => isSender ? "right": "left"};
`;

const Sender = styled.div`
  order: ${({isSender}) => isSender ? 1 : 0}
`;

const SenderName = styled.div`
  margin: 0px 10px;
  padding: 0 10px;

  font-size: 12px;
  color: #aaa;
`;

const MessageGroup = styled.div`
  display: flex;

  flex-flow: column;
  align-items: ${({isSender}) => isSender ? "flex-end" : "flex-start"};
`;

const ErrorMessage = styled.div`
  color: #333;
`;

function groupMessages(messages) {
  return messages.reduce(
    (groups, message) => {
      const lastGroup = groups[groups.length - 1];
      if (!lastGroup) {
        return [[message]];
      }

      if (message.sender.id === lastGroup[0].sender.id) {
        return [
          ...groups.slice(0, -1),
          [...lastGroup, message],
        ];
      }

      return [
        ...groups,
        [message],
      ]
    },
    [],
  );
}


const ConversationPane = ({ conversation }) => {
  if (!conversation) {
    return (
      <ConversationContainer>
        <ErrorMessage>Please select a conversation.</ErrorMessage>
      </ConversationContainer>
    )
  }
  if (!conversation.messages.length) {
    return (
      <ConversationContainer>
        <ErrorMessage>This conversation does not yet have any messages.</ErrorMessage>
      </ConversationContainer>
    );
  }

  const groupedMessages = groupMessages(conversation.messages);
  const messages = groupedMessages.map(messages => {
    const firstMessage = messages[0];
    const sender = firstMessage.sender;
    return (
      <CurrentUserContext.Consumer key={`${sender.id}-${firstMessage.id}`}>
        {me => {
          const isSender = me.id === sender.id;
          return (
            <SenderMessageGroup isSender={isSender}>
              <Sender isSender={isSender}>
                <ChatSenderIcon user={sender} />
              </Sender>
              <MessageGroup isSender={isSender}>
                {!isSender && <SenderName>{sender.name}</SenderName>}
                {messages.map(message => (
                  <Message key={message.id} message={message} />
                ))}
              </MessageGroup>
            </SenderMessageGroup>
          );
        }}
      </CurrentUserContext.Consumer>
    );
  })

  return (
    <ConversationContainer>
      {messages}
    </ConversationContainer>
  )
};

export default createFragmentContainer(ConversationPane, {
  conversation: graphql`
    fragment ConversationPane_conversation on Conversation {
      id
      messages {
        id
        sender {
          id
          ...ChatSenderIcon_user
        }
        ...Message_message
      }
    }
  `,
});
