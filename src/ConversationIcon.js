import React from 'react';
import graphql from 'babel-plugin-relay/macro';
import { createFragmentContainer } from 'react-relay';
import styled from 'styled-components/macro';

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


const ConversationIcon = ({ conversation }) => {
  const name = conversation.name !== null ? conversation.name[0] : "";
  return (
    <Bubble>
      {name}
    </Bubble>
  );
}

export default createFragmentContainer(ConversationIcon, {
  conversation: graphql`
    fragment ConversationIcon_conversation on Conversation {
      name
      participants {
        name
      }
    }
  `,
});
