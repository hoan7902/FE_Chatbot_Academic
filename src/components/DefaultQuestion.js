import { memo } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteCurrentReponseMessage,
  deleteCurrentUserMessage,
  getCurrentUserMessage,
  getListMessagePair,
  getListUserMessenger,
} from '../features/Message/slice';
import { getListChat } from '../features/Message/thunk';
import { globalColor } from '../theme';

const Container = styled.div`
  border: 1px solid ${globalColor.borderLight};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1px;
  padding: 10px 20px;
  width: 100%;
  cursor: pointer;
`;

const TextTopic = styled.span`
  font-size: 15px;
  color: ${globalColor.white};
`;

const TextContent = styled.span`
  font-size: 12px;
  color: ${globalColor.borderLight};
`;

const DefaultQuestion = ({ topic, content }) => {
  const dispatch = useDispatch();
  const conversationId = useSelector(
    state => state.messageReducer.conversationId,
  );

  const sendMessage = async () => {
    dispatch(getListMessagePair());
    dispatch(deleteCurrentReponseMessage());
    dispatch(deleteCurrentUserMessage());
    dispatch(getListUserMessenger({ message: content }));
    dispatch(getCurrentUserMessage({ message: content }));
    dispatch(getListChat({ useMessage: content, conversationId }));
  };

  return (
    <Container onClick={sendMessage}>
      <TextTopic>{topic}</TextTopic>
      <TextContent>{content}</TextContent>
    </Container>
  );
};

export default memo(DefaultQuestion);
