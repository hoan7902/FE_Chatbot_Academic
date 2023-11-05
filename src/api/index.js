import axios from 'axios';

export const callOpenAI = async ({ message }) => {
  const OPENAI_API_KEY = process.env.REACT_APP_API_KEY_GPT; // Replace with your OpenAI API key

  const requestData = {
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: message }],
    temperature: 0.7,
  };

  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', requestData, {
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
