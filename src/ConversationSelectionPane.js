
import React from 'react';
import styled from 'styled-components/macro';
import ConversationIcon from './ConversationIcon';


const ListWrapper = styled.div`
`;

const SearchBar = styled.div``;

const ConversationList = styled.div``;

const ConversationItem = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  & > * {
    margin: 10px;
  }
`;

const ConversationName = styled.h2`
  flex: 1 0 auto;
`;

const ConversationSelectionPane = (props) => (
  <ListWrapper>
    <SearchBar></SearchBar>
    <ConversationList>
      {props.conversations.map(conversation => (
        <ConversationItem key={conversation.id}>
          <ConversationIcon>{conversation}</ConversationIcon>
          <span>{conversation.name || "Untitled Conversation"}</span>
        </ConversationItem>
      ))}
    </ConversationList>
  </ListWrapper>
);

export default ConversationSelectionPane;
