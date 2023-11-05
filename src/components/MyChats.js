import { Text } from '@chakra-ui/react';
import styled from 'styled-components';
import { useState } from 'react';
import MyChat from './MyChat';
import { listMyChats } from '../utils/mockDataMyChats';
import { VStack } from '../base';
import { globalColor } from '../theme';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${globalColor.darkCharcoalBlack};
  width: 100%;
  
  @media (min-width: 768px) {
    width: 20%;
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

  const handleSelectChat = (index) => {
    // Chỗ này để xử lí chọn topic
    // Xử lí thêm dispatch action để getData của đoạn chat tương ứng
    setSelectedChatIndex(index);
  };
  return (
    <Container>
      <VStack style={{ width: '90%' }}>
        <CustomBox>
          <Text>University Of Technology</Text>
        </CustomBox>
        <VStack>
          {listMyChats.map((myChat, index) => (
            <MyChat
              key={index}
              topic={myChat.topic}
              isSelected={index === selectedChatIndex}
              onSelectChat={() => handleSelectChat(index)}
            />
          ))}
        </VStack>
      </VStack>
    </Container>
  )
}

export default MyChats;
