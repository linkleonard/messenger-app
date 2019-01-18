import React from 'react';
import { commitMutation } from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import styled from 'styled-components/macro';

import environment from './environment';


const MessageForm = styled.form`
  display: flex;
`;

const NewMessageInput = styled.input`
  flex: 1 1 auto;

  margin: 10px;

  background: #fcfcfc;
  border-radius: 10px;
  border: 1px #cfcfcf solid;
  padding: 5px 10px;

  &:focus {
    outline: none;
    border: 1px #9f9f9f solid;
  }
`;


function submit(e) {
  e.preventDefault();

  commitMutation(
    environment,
    {
      mutation: graphql`
        mutation NewMessageForm_CreateMessageMutation($conversationId: ID!, $body: String!) {
          createMessage(conversationId: $conversationId, body: $body) {
            id
          }
        }
      `,
      variables: {
        input: {
          conversationId: "C0",
          body: "hello world",
        }
      }
    }
  )
}


const NewMessageForm = (props) => (
  <MessageForm onSubmit={submit}>
    <NewMessageInput type="text" />
  </MessageForm>
)


export default NewMessageForm;
