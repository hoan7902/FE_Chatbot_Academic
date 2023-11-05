import styled from 'styled-components'
import { ChatIcon } from '@chakra-ui/icons';
import { HStack } from '@chakra-ui/react';
import { globalColor } from '../theme';

const Container = styled.div`
  padding: 12px;
  height: 44px;
  display: flex;
  background-color: ${props => (props.isSelected ? '#343541' : '')};
  align-items: center;
  border-radius: 8px;

  &:hover {
    background-color: ${globalColor.deepMidnightBlack};
    cursor: pointer;
    transition: 0.5 ease;
  }
`

const TxtTopic = styled.div`
  color: ${globalColor.white};
  font-size: 15px;
`

const IconContainer = styled.div`
  color: ${globalColor.white};
  margin-right: 10px;
`

const MyChat = ({ topic, isSelected, onSelectChat }) => {
  const handleSelectChat = () => {
    onSelectChat();
  };

  return (
    <Container onClick={handleSelectChat} isSelected={isSelected}>
      <HStack style={{ alignItems: 'center' }}>
        <IconContainer>
          <ChatIcon />
        </IconContainer>
        <TxtTopic>{topic}</TxtTopic>
      </HStack>
    </Container>
  );
};

export default MyChat
