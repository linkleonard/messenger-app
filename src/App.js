import { QueryRenderer } from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import React, { Component } from 'react';
import environment from './environment';
import ConversationPane from './ConversationPane';
import CurrentUserContext from './CurrentUserContext';

const App = () => (
  <QueryRenderer
    environment={environment}
    query={graphql`
      query AppQuery {
        me {
          id
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
        <div className="App">
          <CurrentUserContext.Provider value={props.me}>
            <ConversationPane />
          </CurrentUserContext.Provider>
        </div>
      );
    }}
  />
);


export default App;