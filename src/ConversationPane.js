import React from 'react';
import graphql from 'babel-plugin-relay/macro';
import { QueryRenderer } from 'react-relay';
import styled from 'styled-components/macro';

import environment from './environment';
import CurrentUserContext from './CurrentUserContext';
import ChatSenderIcon from './ChatSenderIcon';


const ConversationContainer = styled.div`
  display: flex;

  flex-flow: column;
  align-items: center;
  justify-items: flex-end;

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

const Message = styled.div.attrs({
  side: ({isSender}) => isSender ? "right" : "left",
})`
  display: inline-block;
  flex: 0 1 0;

  margin: 2.5px 10px;
  padding: 5px 10px;
  border-radius: 20px;

  background: #ccccff;

  font-size: 14px;
  border: 1px solid transparent;
  border-bottom-${({side}) => side}-radius: 5px;

  & + div {
    border-top-${({side}) => side}-radius: 5px;
  }

  &:last-child {
    border-bottom-${({side}) => side}-radius: 20px;
  }
`;

const MessageGroup = styled.div`
  display: flex;

  flex-flow: column;
  align-items: ${({isSender}) => isSender ? "flex-end" : "flex-start"};
`;

const ConversationPane = (props) => (
  <QueryRenderer
    environment={environment}
    query={graphql`
      query ConversationPanelQuery {
        messages {
          id
          body
          sender {
            id
            name
          }
        }
      }
    `}
    variables={{userID: props.userID}}
    render={({error, props}) => {
      if (error) {
        return <div>Error!</div>;
      }
      if (!props) {
        return <div>Loading...</div>;
      }

      const groupedMessages = props.messages.reduce(
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

      return (
        <ConversationContainer>
          {groupedMessages.map(messages => {
            const firstMessage = messages[0];
            const sender = firstMessage.sender;
            return (
              <CurrentUserContext.Consumer key={`${sender.id}-${firstMessage.id}`}>
                {me => {
                  const isSender = me.id === sender.id;
                  return (
                    <SenderMessageGroup isSender={isSender}>
                      <Sender isSender={isSender}>
                        <ChatSenderIcon>{sender}</ChatSenderIcon>
                      </Sender>
                      <MessageGroup isSender={isSender}>
                        {!isSender && <SenderName>{sender.name}</SenderName>}
                        {messages.map(message => (
                          <Message isSender={isSender} key={message.id}>
                            {message.body}
                          </Message>
                        ))}
                      </MessageGroup>
                    </SenderMessageGroup>
                  );
                }}
              </CurrentUserContext.Consumer>
            );
          })}
        </ConversationContainer>
      );
    }}
  />
)

export default ConversationPane;
