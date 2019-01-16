import React from 'react';
import styled from 'styled-components/macro';

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


graphql`
  mutation NewMessageForm_CreateMessage(conversation: Conversation!, body: String!) {
    createMessage(conversation: $conversation, body: $body) {
      id
    }
  }
`

function submit(e) {
  e.preventDefault();
}


const NewMessageForm = (props) => (
  <MessageForm onSubmit={submit}>
    <NewMessageInput type="text" />
  </MessageForm>
)


export default NewMessageForm;
