import React from 'react';
import styled from 'styled-components/macro';

const ListWrapper = styled.div`
`;

const SearchBar = styled.div``;

const ConversationList = styled.div``;

const ConversationItem = styled.div``;

const ConversationSelectionPane = (props) => (
  <ListWrapper>
    <SearchBar></SearchBar>
    <ConversationList>
      {props.conversations.map(conversation => (
        <ConversationItem>
          {conversation.name || "Untitled Conversation"}
        </ConversationItem>
      ))}
    </ConversationList>
  </ListWrapper>
);

export default ConversationSelectionPane;
