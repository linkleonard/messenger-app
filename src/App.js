import { QueryRenderer } from 'react-relay';
import { BrowserRouter as Router, Route } from "react-router-dom";
import styled, { createGlobalStyle } from 'styled-components/macro';
import graphql from 'babel-plugin-relay/macro';
import React from 'react';
import environment from './environment';
import ConversationListView from './ConversationListView';
import CurrentUserContext from './CurrentUserContext';
import CurrentConversationContext from './CurrentConversationContext';

const AppWrapper = styled.div`
  display: flex;
  flex-flow: row;
  height: 100%;
`;

const GlobalStyle = createGlobalStyle`
  #root,
  body,
  html {
    height: 100%;
  }
`


const Conversations = ({ match, conversations }) => {
  return (
    <CurrentConversationContext.Provider value={match.params.id}>
      <ConversationListView
        activeConversationId={match.params.id}
        conversations={conversations}
      />
    </CurrentConversationContext.Provider>
  );
};


const App = () => (
  <QueryRenderer
    environment={environment}
    query={graphql`
      query AppQuery {
        me {
          id
        }
        conversations {
          ...ConversationListView_conversations
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
            <Router>
              <Route
                path="/conversation/:id?/"
                render={({match}) => (
                  <Conversations match={match} conversations={props.conversations} />
                )}
              />
            </Router>
          </CurrentUserContext.Provider>
          <GlobalStyle />
        </AppWrapper>
      );
    }}
  />
);


export default App;
