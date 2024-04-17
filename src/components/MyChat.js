/* eslint-disable no-unused-vars */
import styled from 'styled-components'
import { ChatIcon, EditIcon, SmallCloseIcon } from '@chakra-ui/icons';
import { HStack, Input } from '@chakra-ui/react';
import {
  useCallback, useState, useEffect, useRef,
} from 'react';
import { globalColor } from '../theme';
import { deleteChat, editNameChat } from '../api';
import useFetchListTopicChat from '../hooks/useFetchListTopicChat';

const Container = styled.div`
  padding: 12px;
  height: 44px;
  display: flex;
  background-color: ${props => (props.isSelected ? '#343541' : '')};
  align-items: center;
  justify-content: space-between;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: ${globalColor.deepMidnightBlack};
    cursor: pointer;
    transition: 0.5 ease;
  }
`

const IconContainer = styled.div`
  color: ${globalColor.white};
  cursor: pointer;
  .mr-10 {
    margin-right: 10px;
  }
  .mr-5 {
    margin-right: 5px;
  }
`

const InputStyled = styled(Input)`
  color: ${globalColor.white};
  font-size: 17px;
  outline: none;
  border: none;
  cursor: pointer;
`

const MyChat = ({
  topic, isSelected, onSelectChat, isCanDelete, setSelectedChatIndex, chatId,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(topic);

  const { fetchListTopicChat } = useFetchListTopicChat();

  const handleChangeName = useCallback((text) => {
    setName(text);
  }, []);

  const handleSelectChat = () => {
    onSelectChat();
    setIsEditing(false);
  };

  const inputRef = useRef();

  const handleEditNameChat = useCallback(() => {
    setIsEditing(true);
  }, []);

  const handleEditNameChatFinish = useCallback(async () => {
    await editNameChat({ name, conversationId: chatId });
  }, [name, chatId]);

  const handleDeleteChat = useCallback(async () => {
    await deleteChat(chatId);
    setSelectedChatIndex(0);
    fetchListTopicChat();
  }, [chatId, setSelectedChatIndex, fetchListTopicChat]);

  useEffect(() => {
    if (inputRef.current && isEditing) {
      inputRef.current.focus();
    } else if (inputRef.current) {
      inputRef.current.blur();
    }
  }, [isEditing, isSelected]);

  return (
    <Container isSelected={isSelected}>
      <HStack style={{ alignItems: 'center', cursor: 'pointer' }} onClick={handleSelectChat}>
        <IconContainer className="mr-10">
          <ChatIcon />
        </IconContainer>
        <InputStyled
          value={name}
          isReadOnly={!(isEditing && isSelected)}
          onChange={e => handleChangeName(e.target.value)}
          onBlur={handleEditNameChatFinish}
          type="text"
          ref={inputRef}
          onKeyDown={(e) => {
            if (e.code === 'Enter') {
              handleEditNameChatFinish()
              e.target.blur()
            }
          }}
        />
      </HStack>
      <HStack style={{ alignItems: 'center' }}>
        {isSelected && (
          <IconContainer className="mr-5" onClick={handleEditNameChat}>
            <EditIcon />
          </IconContainer>
        )}
        {isCanDelete && (
          <IconContainer onClick={handleDeleteChat}>
            <SmallCloseIcon />
          </IconContainer>
        )}
      </HStack>
    </Container>
  );
};

export default MyChat
