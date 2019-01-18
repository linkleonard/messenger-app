import React from 'react';
import graphql from 'babel-plugin-relay/macro';
import { createFragmentContainer } from 'react-relay';
import styled from 'styled-components/macro';

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


const ChatSenderIcon = ({ user }) => (
  <Bubble>{user.name[0]}</Bubble>
)


export default createFragmentContainer(ChatSenderIcon, {
  user: graphql`
    fragment ChatSenderIcon_user on User {
      name
    }
  `
});
