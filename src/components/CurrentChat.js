import { FormControl } from '@chakra-ui/form-control';
import { useDispatch, useSelector } from 'react-redux';
import { Input } from '@chakra-ui/input';
import './styles.css';
import { useState } from 'react';
import styled from 'styled-components';
import {
  deleteCurrentReponseMessage, deleteCurrentUserMessage, getCurrentUserMessage, getListMessagePair, getListUserMessenger,
} from '../features/Message/slice';
import { getListChat } from '../features/Message/thunk';
import { globalColor } from '../theme';

const BoxCustom = styled.div`
  display: block;
  flex-direction: row;
  justify-content: flex-start;
  padding: 0;
  width: auto;
  border-radius: 0;
  overflow-y: visible;
  margin-bottom: 0;
  position: fixed;
  width: 800px;
  right: calc((100% - 320px - 800px) / 2);
  bottom: 27px;
  background-color: ${globalColor.darkGrayBlue};
  padding: 10px;
  padding-top: 0px;
  border-radius: 10px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  border: 0 solid #d9d9e3;
`;

const CurrentChat = () => {
  const [newMessage, setNewMessage] = useState('');
  const questionType = useSelector(state => state.messageReducer.contextTopicKey)
  const dispatch = useDispatch();
  const sendMessage = async () => {
    dispatch(getListMessagePair())
    dispatch(deleteCurrentReponseMessage());
    dispatch(deleteCurrentUserMessage());
    dispatch(getListUserMessenger({ message: newMessage }));
    dispatch(getCurrentUserMessage({ message: newMessage }));
    dispatch(getListChat({ useMessage: newMessage, questionType }));
  };
  const typingHandler = (e) => {
    setNewMessage(e.target.value);
  };
  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
      setNewMessage('')
    }
  };
  return (
    <BoxCustom>
      <FormControl
        id="first-name"
        isRequired
      >
        <Input
          variant="flushed"
          placeholder="Enter a message.."
          value={newMessage}
          onChange={typingHandler}
          onKeyDown={handleEnter}
          color={globalColor.white}
        />
      </FormControl>
    </BoxCustom>
  );
};

export default CurrentChat;
