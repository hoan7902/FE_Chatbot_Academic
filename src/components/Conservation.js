import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { useEffect, useRef } from 'react';
import SingleChat from './SingleChat';
import { globalColor } from '../theme';

const Txt = styled.h2`
  font-weight: 600;
  text-align: center;
  color: ${globalColor.deepSeaGray};
  text-transform: uppercase;
  font-size: 47px;
  height: 100%;
  display: flex;
  align-items: center;
`;

const WrapConservation = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 90px;
`


const Conservation = () => {
  const currentUserMessage = useSelector(state => state.messageReducer.currentUserMessage)
  const currentResponseMessage = useSelector(state => state.messageReducer.currentResponseMessage)
  const listMessagePair = useSelector(state => state.messageReducer.listMessagePair)
  const messagesEndRef = useRef(null)
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }
  useEffect(() => {
    scrollToBottom()
  }, [currentUserMessage]);
  if (currentUserMessage === '') return <Txt>ChatBku-TLA</Txt>

  return (
    <WrapConservation>
      {listMessagePair.map(messagePair => <SingleChat textUser={messagePair.question} textResponse={`${messagePair.response}`} isOldChat />)}
      <SingleChat textUser={currentUserMessage} textResponse={currentResponseMessage} />
      <div ref={messagesEndRef} />
    </WrapConservation>
  )
}

export default Conservation;
