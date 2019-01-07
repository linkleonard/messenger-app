
import React from 'react';
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

const ConversationSelectionPane = (props) => (
  <CurrentConversationContext.Consumer>
    {value => (
      <ListWrapper>
        <SearchBar></SearchBar>
        <ConversationList>
          {props.conversations.map(conversation => (
            <ConversationItem key={conversation.id} active={conversation.id === value}>
              <ConversationIcon>{conversation}</ConversationIcon>
              <span>{conversation.name || "Untitled Conversation"}</span>
            </ConversationItem>
          ))}
        </ConversationList>
      </ListWrapper>
    )}
  </CurrentConversationContext.Consumer>
);

export default ConversationSelectionPane;
