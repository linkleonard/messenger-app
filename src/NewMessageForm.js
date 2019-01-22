import React from 'react';
import { commitMutation } from 'react-relay';
import { ConnectionHandler } from 'relay-runtime';

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




class NewMessageForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      body: "",
    };

    this.submit = this.submit.bind(this);
    this.changeBody = this.changeBody.bind(this);
  }

  submit(e) {
    e.preventDefault();

    const { conversation } = this.props;

    commitMutation(
      environment,
      {
        mutation: graphql`
          mutation NewMessageForm_CreateMessageMutation($conversationId: ID!, $body: String!) {
            createMessage(conversationId: $conversationId, body: $body) {
              id
              conversation {
                id
              }
              body
              sender {
                id
                name
              }
            }
          }
        `,
        variables: {
          conversationId: conversation.id,
          body: this.state.body,
        },
        updater: (store) => {
          // Create an edge between the current conversation, to the newly created message payload.
          const payload = store.getRootField("createMessage");
          const conversation = payload.getLinkedRecord("conversation");

          const newMessages = [
            ...conversation.getLinkedRecords("messages"),
            payload,
          ];
          conversation.setLinkedRecords(newMessages, "messages");
        }
      }
    );

    this.setState({ body: "" });
  }

  changeBody(e) {
    this.setState({
      body: e.target.value,
    });
  }

  render() {
    return (
      <MessageForm onSubmit={this.submit}>
        <NewMessageInput type="text" value={this.state.body} onChange={this.changeBody}/>
      </MessageForm>
    )
  }
}

export default NewMessageForm;
