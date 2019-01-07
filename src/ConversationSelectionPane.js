
import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components/macro';
import ConversationIcon from './ConversationIcon';
import CurrentConversationContext from './CurrentConversationContext';


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

const ConversationName = styled.h2`
  flex: 1 0 auto;
`;

const Name = styled.span``;

const ConversationSelectionPane = (props) => (
  <CurrentConversationContext.Consumer>
    {value => (
      <ListWrapper>
        <SearchBar></SearchBar>
        <ConversationList>
          {props.conversations.map(conversation => (
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
                <ConversationIcon>{conversation}</ConversationIcon>
                <Name active={conversation.id === value}>{conversation.name || "Untitled Conversation"}</Name>
              </ConversationItem>
            </NavLink>
          ))}
        </ConversationList>
      </ListWrapper>
    )}
  </CurrentConversationContext.Consumer>
);

export default ConversationSelectionPane;
