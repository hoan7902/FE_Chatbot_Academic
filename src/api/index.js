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

export const callBkuApi = async ({ message, questionType = 1 }) => {
  try {
    const response = await axios.post(`${BASE_URL.BASE_BKU}/api/ask`, {
      question: message,
      question_type: questionType,
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
      // timeout: 3000, // Timeout set to 3 seconds (3000 milliseconds)
    });
    if (response?.data?.data?.point < 0) {
      return 'Xin lỗi, tôi không thể hỗ trợ bạn trả lời câu hỏi này.'
    }
    return response?.data?.data?.answer;
  } catch (error) {
    // Handle any errors here
    console.error(error);
    return 'Đã có lỗi xảy ra!!!';
  }
};

export const getListQuestionTypes = async () => {
  const response = await axios.get(`${BASE_URL.BASE_BKU}/api/question-types`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const questionTypes = response?.data?.data?.question_types || [];

  const uniqueQuestionTypes = questionTypes.reduce((acc, curr) => {
    const found = acc.some(item => item.context_key === curr.context_key);
    if (!found) {
      acc.push(curr);
    }
    return acc;
  }, []);

  return uniqueQuestionTypes;
}
