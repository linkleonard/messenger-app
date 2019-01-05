import { QueryRenderer } from 'react-relay';
import styled from 'styled-components/macro';
import graphql from 'babel-plugin-relay/macro';
import React from 'react';
import environment from './environment';
import ConversationPane from './ConversationPane';
import ConversationSelectionPane from './ConversationSelectionPane';
import CurrentUserContext from './CurrentUserContext';

const AppWrapper = styled.div`
  display: flex;
  flex-flow: row;
  height: 100%;
`;

const SelectionPaneWrapper = styled.div`
  flex: 0 0 200px;
`;

const ConversationPaneWrapper = styled.div`
  flex: 1 1 auto;
`

const App = () => (
  <QueryRenderer
    environment={environment}
    query={graphql`
      query AppQuery {
        me {
          id
        }
        conversations {
          id
          name
          participants {
            id
            name
          }
        }
      }
    `}
    variables={{}}
    render={({error, props}) => {
      if (error) {
        return "Error!";
      }
      if (!props) {
        return "Loading...";
      }

      return (
        <AppWrapper>
          <CurrentUserContext.Provider value={props.me}>
            <SelectionPaneWrapper>
              <ConversationSelectionPane
                activeConversation={props.conversations[0].id}
                conversations={props.conversations}
              />
            </SelectionPaneWrapper>

            <ConversationPaneWrapper>
              <ConversationPane
                activeConversation={props.conversations[0].id}
                conversations={props.conversations}
              />
            </ConversationPaneWrapper>
          </CurrentUserContext.Provider>
        </AppWrapper>
      );
    }}
  />
);


export default App;
