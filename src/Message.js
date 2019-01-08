import React from 'react';
import graphql from 'babel-plugin-relay/macro';
import { createFragmentContainer } from 'react-relay';
import styled from 'styled-components/macro';

import CurrentUserContext from './CurrentUserContext';



const tightRadius = "5px";
const wideRadius = "20px";

const MessageContainer = styled.div.attrs(({isSender}) => ({
  firstLeftRadius: isSender ? wideRadius : tightRadius,
  firstRightRadius: isSender ? tightRadius : wideRadius,
  middleLeftRadius: isSender ? wideRadius : tightRadius,
  middleRightRadius: isSender ? tightRadius : wideRadius,
}))`
  display: inline-block;
  flex: 0 1 0;

  margin: 2.5px 10px;
  padding: 5px 10px;
  border-radius: 20px;

  background: #ccccff;

  font-size: 14px;
  border: 1px solid transparent;
  border-bottom-left-radius: ${({firstLeftRadius}) => firstLeftRadius};
  border-bottom-right-radius: ${({firstRightRadius}) => firstRightRadius};

  & + div {
    border-top-left-radius: ${({middleLeftRadius}) => middleLeftRadius};
    border-top-right-radius: ${({middleRightRadius}) => middleRightRadius};
  }

  &:last-child {
    border-bottom-left-radius: ${wideRadius};
    border-bottom-right-radius: ${wideRadius};
  }
`;


const Message = ({ message }) => (
  <CurrentUserContext.Consumer>
    {me => (
      <MessageContainer isSender={message.sender.id === me.id}>
        {message.body}
      </MessageContainer>
    )}
  </CurrentUserContext.Consumer>
);

export default createFragmentContainer(Message, {
  message: graphql`
    fragment Message_message on Message {
      body
      sender {
        id
      }
    }
  `,
});
