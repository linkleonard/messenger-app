import React from 'react';
import graphql from 'babel-plugin-relay/macro';
import { createFragmentContainer } from 'react-relay';

import { NavLink } from 'react-router-dom';
import styled from 'styled-components/macro';
import ConversationIcon from './ConversationIcon';
import CurrentConversationContext from './CurrentConversationContext';
import ConversationName from './ConversationName';


const ListWrapper = styled.div`
`;

const SearchBar = styled.div``;

const ConversationList = styled.div``;

const ConversationItem = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  background: ${props => props.active ? "#f3f3f3" : "white"};
  text-decoration: none;

  & > * {
    margin: 10px;
  }

  &:hover {
    background: #f3f3f3;
  }
`;


const ConversationSelectionPane = ({ conversations }) => (
  <CurrentConversationContext.Consumer>
    {value => (
      <ListWrapper>
        <SearchBar></SearchBar>
        <ConversationList>
          {conversations.map(conversation => (
            <NavLink
              key={conversation.id}
              to={`/conversation/${conversation.id}/`}
              style={{
                textDecoration: "none",
                color: "#ccc",
              }}
              activeStyle={{
                color: "black",
              }}>
              <ConversationItem active={conversation.id === value}>
                <ConversationIcon conversation={conversation} />
                <ConversationName conversation={conversation} />
              </ConversationItem>
            </NavLink>
          ))}
        </ConversationList>
      </ListWrapper>
    )}
  </CurrentConversationContext.Consumer>
);

export default createFragmentContainer(ConversationSelectionPane, {
  conversations: graphql`
    fragment ConversationSelectionPane_conversations on Conversation @relay(plural: true) {
      id
      ...ConversationName_conversation
      ...ConversationIcon_conversation
    }
  `,
});
