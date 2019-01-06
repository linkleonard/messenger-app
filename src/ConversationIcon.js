import React from 'react';
import graphql from 'babel-plugin-relay/macro';
import { QueryRenderer } from 'react-relay';
import styled from 'styled-components/macro';

import environment from './environment';

const Bubble = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  border: 1px solid #ccc;
  border-radius: 100%;
  height: 50px;
  width: 50px;
  text-align: center;
`;


const ConversationIcon = ({ children }) => (
  <QueryRenderer
    environment={environment}
    variables={{conversationId: children.id}}
    query={graphql`
      query ConversationIconQuery($conversationId: ID) {
        conversation(id: $conversationId) {
          name
          participants {
            name
          }
        }
      }
    `}
    render={({error, props}) => {
      if (error) {
        return "Error!";
      }
      if (!props) {
        return "Loading...";
      }
      const name = props.conversation.name !== null ? props.conversation.name[0] : "";
      return <Bubble>{name}</Bubble>;
    }}
  />
);

export default ConversationIcon;
