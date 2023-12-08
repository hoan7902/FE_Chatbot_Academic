import styled from '@emotion/styled';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Chatbox from '../components/Chatbox';
import MyChats from '../components/MyChats';
import { getListTopicChat } from '../features/Message/slice';
import { getListQuestionTypes } from '../api';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const Wrap = styled.div`
  display: flex;
  min-height: 100vh;
`

const Chatpage = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    const fetchListTopicChat = async () => {
      try {
        const listTopicChat = await getListQuestionTypes()
        dispatch(getListTopicChat({ listTopicChat }))
      } catch (error) {
        // Handle errors if any
        console.error('Error fetching listTopicChat: ', error);
      }
    }

    fetchListTopicChat();
  }, []);

  return (
    <Container>
      <Wrap>
        <MyChats />
        <Chatbox />
      </Wrap>
    </Container>
  );
};

export default Chatpage;
