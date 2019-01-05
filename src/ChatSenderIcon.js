import React from 'react';
import graphql from 'babel-plugin-relay/macro';
import { QueryRenderer } from 'react-relay';
import styled from 'styled-components/macro';

import environment from './environment';

const Bubble = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  border: 1px solid #ccc;
  border-radius: 100%;
  height: 50px;
  width: 50px;
  text-align: center;
`;


const ChatSenderIcon = ({ children }) => (
  <QueryRenderer
    environment={environment}
    variables={{senderID: children.id}}
    query={graphql`
      query ChatSenderIconQuery($senderID: ID) {
        user(id: $senderID) {
          name
        }
      }
    `}
    render={({error, props}) => {
      if (error) {
        return "Error!";
      }
      if (!props) {
        return "Loading...";
      }
      return <Bubble>{props.user.name[0]}</Bubble>;
    }}
  />
);

export default ChatSenderIcon;
