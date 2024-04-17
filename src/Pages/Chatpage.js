/* eslint-disable no-unused-vars */
import styled from '@emotion/styled';
import { useEffect, useCallback, useState } from 'react';
import {
  Drawer, DrawerBody,
} from '@chakra-ui/react'
import Chatbox from '../components/Chatbox';
import MyChats from '../components/MyChats';
import useFetchListTopicChat from '../hooks/useFetchListTopicChat';
import { createNewChat } from '../api';
import useFetchListMessagePair from '../hooks/useFetchListMessagePair';
import useIsMobile from '../hooks/useIsMobile';
import { globalColor } from '../theme';

const DrawerStyled = styled(Drawer)`
  z-index: 2;
`

const DrawerBodyStyled = styled(DrawerBody)`
  z-index: 2;
`

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const Wrap = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: ${globalColor.slateBlack};
`

const Chatpage = () => {
  const { fetchListTopicChat, listTopicChat } = useFetchListTopicChat();
  const { handleSetIdAndFetchData } = useFetchListMessagePair();
  const [isOpenMyChats, setIsOpenMyChats] = useState(false);

  const onOpenMyChats = useCallback(() => {
    setIsOpenMyChats(true)
  }, []);

  const onCloseMyChats = useCallback(() => {
    setIsOpenMyChats(false)
  }, [])

  const isMobile = useIsMobile()

  useEffect(() => {
    fetchListTopicChat();
  }, []);

  const handleCreateNewChat = useCallback(async () => {
    const nameChat = 'New Chat';
    await createNewChat(nameChat);
    fetchListTopicChat();
    handleSetIdAndFetchData();
  }, [fetchListTopicChat, handleSetIdAndFetchData]);

  useEffect(() => {
    if (listTopicChat && listTopicChat.length === 0) {
      handleCreateNewChat();
    }
  }, [listTopicChat]);


  if (isMobile) {
    return (
      <Container>
        <Wrap>
          <Chatbox onOpenMyChats={onOpenMyChats} />
          <MyChats onCloseMyChats={onCloseMyChats} isOpenMyChats={isOpenMyChats} />
        </Wrap>
      </Container>
    )
  }

  return (
    <Container>
      <Wrap>
        <MyChats />
        <Chatbox onOpenMyChats={onOpenMyChats} />
      </Wrap>

    </Container>
  );
};

export default Chatpage;
