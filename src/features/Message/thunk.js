import { getHistoryChats, sendMessageToBkuChat } from '../../api';
import {
  fetchListMessagePair,
  fetchListResponseMessenger,
  fetchListUserMessenger,
  getCurrentReponseMessage, getListResponseMessenger, getMessagePair,
} from './slice';

// const handleSend = async ({ message }) => {
//   await callOpenAI({ message })
// };

export const getListChat = payload => async (dispatch) => {
  const response = await sendMessageToBkuChat({
    message: payload.useMessage,
    conversationId: payload.conversationId,
  });
  dispatch(getCurrentReponseMessage({ message: response }));
  dispatch(getListResponseMessenger({ message: response }));
  dispatch(getMessagePair());
};

export const fetchDataListMessagePair = payload => async (dispatch) => {
  if (payload.conversationId) {
    const res = await getHistoryChats(payload.conversationId);
    const listHistory = res?.data?.data.reverse();
    const listUserMessage = listHistory
      .filter(item => item.sender === 'human')
      .map(item => item.message);
    const listChatBoxMessage = listHistory
      .filter(item => item.sender === 'bot')
      .map(item => item.message);
    const listMessagePair = [];
    for (let i = 0; i < listUserMessage.length; i += 1) {
      listMessagePair.push({
        question: listUserMessage[i],
        response: listChatBoxMessage[i],
      });
    }
    dispatch(fetchListMessagePair({ listMessagePair }));
    dispatch(fetchListUserMessenger({ listUserMessage }));
    dispatch(fetchListResponseMessenger({ listChatBoxMessage }));
  }
};
