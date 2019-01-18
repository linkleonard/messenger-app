import React from 'react';
import graphql from 'babel-plugin-relay/macro';
import { createFragmentContainer } from 'react-relay';
import CurrentUserContext from './CurrentUserContext';


const ConversationName = ({ conversation }) => (
  <CurrentUserContext.Consumer>
    {({id: currentUserId}) => {
      if (conversation.name) {
        return conversation.name;
      }
      const otherParticipants = conversation.participants.filter(
        participant => participant.id !== currentUserId
      );
      if (otherParticipants.length === 1) {
        return otherParticipants[0].name;
      }
      return 'Untitled Conversation';
    }}
  </CurrentUserContext.Consumer>
);


export default createFragmentContainer(ConversationName, {
  conversation: graphql`
    fragment ConversationName_conversation on Conversation {
      name
      participants {
        id
        name
      }
    }
  `,
});
