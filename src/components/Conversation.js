/* eslint-disable no-unused-vars */
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { useEffect, useRef } from 'react';
import SingleChat from './SingleChat';
import { globalColor } from '../theme';
import useFetchListMessagePair from '../hooks/useFetchListMessagePair';
import DefaultQuestion from './DefaultQuestion';
import { defaultQuestions } from '../constants/mockData';

const Txt = styled.h2`
  font-weight: 600;
  text-align: center;
  color: ${globalColor.deepSeaGray};
  text-transform: uppercase;
  font-size: 47px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const WrapConversation = styled.div`
  @media (min-width: 768px) {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-bottom: 90px;
  }
  @media (max-width: 767) {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100vh;
  }
  padding-bottom: ${props => (props.hasPaddingBottom ? '100px' : '0')};
`

const StartContainer = styled.div`
  display: flex;
  height: ${props => (props.isMobile ? 'calc(100% - 70px)' : '100%')};
  justify-content: space-around;
  align-items: center;
  flex: 1;
`;

const TitleContainer = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const DefaultQuestionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Conversation = ({ isMobile }) => {
  const currentUserMessage = useSelector(state => state.messageReducer.currentUserMessage)
  const currentResponseMessage = useSelector(state => state.messageReducer.currentResponseMessage)
  const listMessagePair = useSelector(state => state.messageReducer.listMessagePair)
  const listTopicChat = useSelector(state => state.messageReducer.listTopicChat)
  const messagesEndRef = useRef(null)
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView();
    }
  }

  const { handleSetIdAndFetchData } = useFetchListMessagePair();

  useEffect(() => {
    handleSetIdAndFetchData();
  }, [listTopicChat, handleSetIdAndFetchData]);
  useEffect(() => {
    scrollToBottom()
  }, [currentUserMessage]);
  if (
    listMessagePair.length === 0
    && !currentResponseMessage
    && !currentUserMessage
  ) {
    return (
      <StartContainer isMobile={isMobile}>
        <DefaultQuestionContainer>
          <TitleContainer>
            <Txt>Chat Bku</Txt>
            <span style={{ color: globalColor.white }}>
              Trợ lý ảo học vụ Đại Học Bách Khoa
            </span>
          </TitleContainer>
          {(defaultQuestions || []).map(item => (
            <DefaultQuestion topic={item.topic} content={item.content} />
          ))}
        </DefaultQuestionContainer>
      </StartContainer>
    );
  }

  return (
    <WrapConversation hasPaddingBottom={isMobile}>
      {listMessagePair.map(messagePair => <SingleChat textUser={messagePair.question} textResponse={`${messagePair.response}`} isOldChat />)}
      {currentUserMessage !== '' ? <SingleChat textUser={currentUserMessage} textResponse={currentResponseMessage} /> : null}
      <div ref={messagesEndRef} />
    </WrapConversation>
  )
}

export default Conversation;
