import { useCallback } from 'react';
import styled from 'styled-components';
import { HamburgerIcon, EditIcon } from '@chakra-ui/icons'
import { globalColor } from '../theme';
import { createNewChat } from '../api';
import useFetchListTopicChat from '../hooks/useFetchListTopicChat';
import useFetchListMessagePair from '../hooks/useFetchListMessagePair';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0;
  background-color: ${globalColor.darkGrayBlue};
`;

const MenuFoldContainer = styled.div`
  margin-left: 10px;
  color: ${globalColor.white};
`;

const NewMessageContainer = styled.div`
  margin-right: 10px;
  color: ${globalColor.white};
`;

const TextStyled = styled.span`
  color: ${globalColor.white};
  font-size: 20px;
`;

const TopNav = ({ onOpenMyChats }) => {
  const { fetchListTopicChat } = useFetchListTopicChat();
  const { handleSetIdAndFetchData } = useFetchListMessagePair();

  const handleCreateNewChat = useCallback(
    async (e) => {
      e.stopPropagation();
      const nameChat = 'New Chat';
      await createNewChat(nameChat);
      fetchListTopicChat();
      handleSetIdAndFetchData();
    },
    [fetchListTopicChat, handleSetIdAndFetchData],
  );

  return (
    <Container onClick={onOpenMyChats}>
      <MenuFoldContainer onClick={onOpenMyChats}>
        <HamburgerIcon />
      </MenuFoldContainer>
      <TextStyled>CHAT BKU</TextStyled>
      <NewMessageContainer onClick={e => handleCreateNewChat(e)}>
        <EditIcon />
      </NewMessageContainer>
    </Container>
  );
};

export default TopNav;
