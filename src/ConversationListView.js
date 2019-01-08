import React from 'react';
import styled from 'styled-components/macro';
import graphql from 'babel-plugin-relay/macro';
import { createFragmentContainer } from 'react-relay';

import ConversationSelectionPane from './ConversationSelectionPane';
import ConversationPane from './ConversationPane';
import CurrentConversationContext from './CurrentConversationContext';


const ViewWrapper = styled.div`
  display: flex;
  flex: 1 0 auto;
`;

const SelectionPaneWrapper = styled.div`
  flex: 0 0 350px;
`;

const ConversationPaneWrapper = styled.div`
  display: flex;
  flex: 1 1 auto;
`


const ConversationListView = ({ conversations, conversation, activeConversationId }) => (
  <ViewWrapper>
    <SelectionPaneWrapper>
      <ConversationSelectionPane
        conversations={conversations}
      />
    </SelectionPaneWrapper>

    <ConversationPaneWrapper>
      <CurrentConversationContext.Consumer>
        {value => (
          <ConversationPane
            conversation={
              conversations.filter(conversation => conversation.id === value)[0] || null
            }
          />
        )}
      </CurrentConversationContext.Consumer>

    </ConversationPaneWrapper>
  </ViewWrapper>
);


export default createFragmentContainer(ConversationListView, {
  conversations: graphql`
    fragment ConversationListView_conversations on Conversation @relay(plural: true) {
      id
      name
      ...ConversationPane_conversation
      ...ConversationSelectionPane_conversations
    }
  `,
});
