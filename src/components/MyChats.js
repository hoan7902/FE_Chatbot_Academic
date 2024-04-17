/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Text } from '@chakra-ui/react';
import styled from 'styled-components';
import {
  useCallback, useEffect, useState, useContext, useRef,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EditIcon, SettingsIcon } from '@chakra-ui/icons';
import MyChat from './MyChat';
import { VStack } from '../base';
import { globalColor } from '../theme';
import {
  deleteCurrentReponseMessage, deleteCurrentUserMessage, getListMessagePair, setConversationId,
} from '../features/Message/slice';
import { fetchDataListMessagePair } from '../features/Message/thunk';
import { createNewChat } from '../api';
import useFetchListTopicChat from '../hooks/useFetchListTopicChat';
import useFetchListMessagePair from '../hooks/useFetchListMessagePair';
import useOutSideAlerter from '../hooks/useOutSideAlerter';
import { newContext } from '../context';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${globalColor.darkCharcoalBlack};
  height: 100vh;
  z-index: 2;
  
  @media (min-width: 768px) {
    width: 320px;
    position: fixed;
    top: 0;
    left: 0;
    overflow-y: auto;
    z-index: 2;
  }
  @media (max-width: 767px) {
    width: 80%;
    height: 100%;
    position: fixed;
    top: 0;
    left: ${props => (props.isOpenMyChats ? '0' : '-500px')};
    transition: all ease 0.5s;
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
  justify-content: space-around;
  margin-top: 20px;
  margin-bottom: 20px;
  cursor: pointer;
  transition: 0.2s all ease;

  :hover {
    opacity: 0.7;
  }
`;

const LogoutContainer = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border-top-width: 0.2px;
  border-color: ${globalColor.borderLight};
  position: absolute;
  bottom: 0;
  left: 0;

  .row-container {
    display: flex;
    align-items: center;
    gap: 10px;
    color: ${globalColor.white};
  }

  .logout-button {
    border-width: 1px;
    border-color: ${globalColor.borderLight};
    padding: 5px 10px;
    border-radius: 8px;
    cursor: pointer;
    transition: 0.2s all ease;

    :hover {
      opacity: 0.7;
    }
  }
`;

const MyChats = ({ onCloseMyChats, isOpenMyChats }) => {
  const [selectedChatIndex, setSelectedChatIndex] = useState(null);
  const [userName, setUserName] = useState();

  const wrapperRef = useRef(null);
  useOutSideAlerter({ ref: wrapperRef, funcClickOutSide: onCloseMyChats });

  const { reloadPage } = useContext(newContext)

  const { fetchListTopicChat } = useFetchListTopicChat();
  const { handleSetIdAndFetchData } = useFetchListMessagePair();
  const listTopicChat = useSelector(state => state.messageReducer.listTopicChat)
  const dispatch = useDispatch()

  const fetchUserNameFromStorage = useCallback(async () => {
    const name = localStorage.getItem('userName');
    setUserName(name);
  }, []);

  const handleSelectChat = async ({ index, conversationId }) => {
    setSelectedChatIndex(index);
    dispatch(setConversationId({ conversationId }));
    dispatch(fetchDataListMessagePair({ conversationId }));
    dispatch(getListMessagePair());
    dispatch(deleteCurrentReponseMessage());
    dispatch(deleteCurrentUserMessage());
    if (onCloseMyChats) { // close MyChats in mobile
      onCloseMyChats()
    }
  };

  // eslint-disable-next-line no-unused-vars
  const handleLogout = useCallback(async () => {
    localStorage.clear();
    dispatch(deleteCurrentReponseMessage());
    dispatch(deleteCurrentUserMessage());
    reloadPage()
  }, []);

  const handleCreateNewChat = useCallback(async () => {
    const nameChat = 'New Chat';
    await createNewChat(nameChat);
    fetchListTopicChat();
    handleSetIdAndFetchData();
  },
  [fetchListTopicChat, handleSetIdAndFetchData]);

  useEffect(() => {
    fetchUserNameFromStorage();
  }, [fetchUserNameFromStorage]);


  useEffect(() => {
    setSelectedChatIndex(0);
  }, [listTopicChat]);

  return (
    <Container ref={wrapperRef} isOpenMyChats={isOpenMyChats}>
      <VStack style={{ width: '90%' }}>
        <CustomBox onClick={handleCreateNewChat}>
          <Text>University Of Technology</Text>
          <EditIcon />
        </CustomBox>
        <VStack>
          {(listTopicChat || []).map((myChat, index) => (
            <MyChat
              key={myChat.id}
              topic={myChat.name}
              isSelected={index === selectedChatIndex}
              onSelectChat={() => {
                handleSelectChat({
                  index,
                  conversationId: myChat.id,
                });
              }}
              setSelectedChatIndex={setSelectedChatIndex}
              chatId={myChat.id}
              isCanDelete={listTopicChat.length > 1}
            />
          ))}
        </VStack>
      </VStack>
      <LogoutContainer>
        <div className="row-container">
          <SettingsIcon />
          <span style={{ color: globalColor.white, fontSize: 17 }}>
            {userName}
          </span>
        </div>
        <div className="logout-button" onClick={handleLogout}>
          <span style={{ color: globalColor.white, fontSize: 15 }}>Logout</span>
        </div>
      </LogoutContainer>
    </Container>
  )
}

export default MyChats;
