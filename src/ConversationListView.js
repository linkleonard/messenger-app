import React from 'react';
import styled from 'styled-components/macro';

import ConversationSelectionPane from './ConversationSelectionPane';
import ConversationPane from './ConversationPane';


const ViewWrapper = styled.div`
  display: flex;
  flex: 1 0 auto;
`;

const SelectionPaneWrapper = styled.div`
  flex: 0 0 350px;
`;

const ConversationPaneWrapper = styled.div`
  flex: 1 1 auto;
`


const ConversationListView = ({ conversations, activeConversationId }) => (
  <ViewWrapper>
    <SelectionPaneWrapper>
      <ConversationSelectionPane
        conversations={conversations}
      />
    </SelectionPaneWrapper>

    <ConversationPaneWrapper>
      <ConversationPane
        conversations={conversations}
      />
    </ConversationPaneWrapper>
  </ViewWrapper>
);


export default ConversationListView;
