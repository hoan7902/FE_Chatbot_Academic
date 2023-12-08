import { Text } from '@chakra-ui/react';
import styled from 'styled-components';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MyChat from './MyChat';
import { VStack } from '../base';
import { globalColor } from '../theme';
import {
  deleteCurrentReponseMessage, deleteCurrentUserMessage, getContextTopicKey, getCurrentUserMessage, getListMessagePair, getListUserMessenger,
} from '../features/Message/slice';
import { getListChat } from '../features/Message/thunk';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${globalColor.darkCharcoalBlack};
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  overflow-y: auto;
  
  @media (min-width: 768px) {
    width: 320px;
  }
`;

const CustomBox = styled.div`
  border: 1px solid hsla(0, 0%, 100%, 0.2);
  border-radius: 10px;
  width: 100%;
  height: 50px;
  margin-top: 5px;
  display: flex;
  align-items: center;
  color: ${globalColor.white};
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const MyChats = () => {
  const [selectedChatIndex, setSelectedChatIndex] = useState(null);
  const listTopicChat = useSelector(state => state.messageReducer.listTopicChat)
  const dispatch = useDispatch()
  const handleSelectChat = ({ index, contextTopicKey, topic }) => {
    // Chỗ này để xử lí chọn topic
    // Xử lí thêm dispatch action để getData của đoạn chat tương ứng
    // dispatch(resetAllStates())
    setSelectedChatIndex(index)
    dispatch(getContextTopicKey({ contextTopicKey }))

    dispatch(getListMessagePair())
    dispatch(deleteCurrentReponseMessage());
    dispatch(deleteCurrentUserMessage());
    dispatch(getListUserMessenger({ message: `Tôi muốn hỏi các câu hỏi về ${topic}` }));
    dispatch(getCurrentUserMessage({ message: `Tôi muốn hỏi các câu hỏi về ${topic}` }));
    dispatch(getListChat({
      responseTopicMessage: 'Vâng, tôi sẵn sàng giúp bạn',
      isChooseTopic: true,
    }));
  };
  return (
    <Container>
      <VStack style={{ width: '90%' }}>
        <CustomBox>
          <Text>University Of Technology</Text>
        </CustomBox>
        <VStack>
          {listTopicChat.map((myChat, index) => (
            <MyChat
              key={index}
              topic={myChat.title}
              isSelected={index === selectedChatIndex}
              onSelectChat={() => handleSelectChat({
                index,
                contextTopicKey: myChat.context_key,
                topic: myChat.title,
              })}
            />
          ))}
        </VStack>
      </VStack>
    </Container>
  )
}

export default MyChats;
