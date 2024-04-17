import axios from 'axios';
import { BASE_URL } from './constant';

export const callOpenAI = async ({ message }) => {
  const OPENAI_API_KEY = process.env.REACT_APP_API_KEY_GPT; // Replace with your OpenAI API key

  const requestData = {
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: message }],
    temperature: 0.7,
  };

  try {
    const response = await axios.post(`${BASE_URL.BASE_OPEN_AI}/v1/chat/completions`, requestData, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      // timeout: 3000, // Timeout set to 3 seconds (3000 milliseconds)
    });

    // Handle the API response here
    // console.log('check content: ', response.data.choices[0].message.content);
    return response.data.choices[0].message.content;
  } catch (error) {
    // Handle any errors here
    console.error(error);
    return 'API KEY của Open AI hết hạn rồi bạn ơi, lên lấy lại mà dùng :V !!!';
  }
};

export const sendMessageToBkuChat = async ({ message, conversationId }) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(
      `${BASE_URL.BASE_BKU}/api/message/send`,
      {
        message,
        conversation_id: conversationId,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data.answer;
  } catch (error) {
    // Handle any errors here
    console.error('error in sendMessageToBkuChat: ', error);
    return null;
  }
};

export const editNameChat = async ({ name, conversationId }) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(
      `${BASE_URL.BASE_BKU}/api/conversation/change-name`,
      {
        name,
        conversation_id: conversationId,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response;
  } catch (error) {
    // Handle any errors here
    console.error('error in editNameChat: ', error);
    return null;
  }
};

export const deleteChat = async (id) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.delete(
      `${BASE_URL.BASE_BKU}/api/conversation/${id}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response;
  } catch (error) {
    // Handle any errors here
    console.error('error in deleteChat: ', error);
    return null;
  }
};

export const createNewChat = async (nameChat) => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.post(
      `${BASE_URL.BASE_BKU}/api/conversation/create`,
      {
        name: nameChat,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response;
  } catch (error) {
    // Handle any errors here
    console.error('error in createNewChat: ', error);
    return null;
  }
};

export const getMyChats = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(
      `${BASE_URL.BASE_BKU}/api/conversation/get-mine`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response;
  } catch (error) {
    // Handle any errors here
    console.error('error in getMyChats: ', error);
    return null;
  }
};

export const getHistoryChats = async (id) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(
      `${BASE_URL.BASE_BKU}/api/conversation/history?conversation_id=${id}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response;
  } catch (error) {
    // Handle any errors here
    console.error('error in getHistoryChats: ', error);
    return null;
  }
};

export const login = async ({ email, password }) => {
  try {
    const response = await axios.post(
      `${BASE_URL.BASE_BKU}/api/user/login`,
      {
        email,
        password,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    return response;
  } catch (error) {
    // Handle any errors here
    console.error(error);
    return null;
  }
};

export const signIn = async ({ name, email, password }) => {
  try {
    const response = await axios.post(
      `${BASE_URL.BASE_BKU}/api/user/register`,
      {
        name,
        email,
        password,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    return response;
  } catch (error) {
    // Handle any errors here
    console.error(error);
    return null;
  }
};
