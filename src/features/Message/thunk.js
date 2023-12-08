import { callBkuApi } from '../../api';
import {
  getCurrentReponseMessage, getListResponseMessenger, getMessagePair,
} from './slice';

// const handleSend = async ({ message }) => {
//   await callOpenAI({ message })
// };

export const getListChat = payload => async (dispatch) => {
  if (payload.isChooseTopic) {
    dispatch(getCurrentReponseMessage({ message: payload.responseTopicMessage }));
    dispatch(getListResponseMessenger({ message: payload.responseTopicMessage }));
    dispatch(getMessagePair());
  } else {
    const response = await callBkuApi({ message: payload.useMessage, questionType: payload.questionType })
    dispatch(getCurrentReponseMessage({ message: response }));
    dispatch(getListResponseMessenger({ message: response }));
    dispatch(getMessagePair());
  }
};
