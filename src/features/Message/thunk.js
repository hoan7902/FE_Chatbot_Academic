import { callOpenAI } from '../../api';
import {
  getCurrentReponseMessage, getListResponseMessenger, getMessagePair,
} from './slice';

// const handleSend = async ({ message }) => {
//   await callOpenAI({ message })
// };

export const getListChat = payload => async (dispatch) => {
  console.log('check payload: ', payload)
  const response = await callOpenAI({ message: payload.useMessage })
  console.log('check response: ', response)
  dispatch(getCurrentReponseMessage({ message: response }));
  dispatch(getListResponseMessenger({ message: response }));
  dispatch(getMessagePair());

  // Cái này dùng để fake thời gian chờ call API
  // setTimeout(() => {
  //   const response = 'Hỏi ngu vcl';
  //   dispatch(getCurrentReponseMessage({ message: response }));
  //   dispatch(getListResponseMessenger({ message: response }));
  //   dispatch(getMessagePair());
  //   console.log('fetch data xong...');
  // }, 1000);
};
