import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMyChats } from '../api';
import { getListTopicChat } from '../features/Message/slice';

const useFetchListTopicChat = () => {
  const dispatch = useDispatch();
  const listTopicChat = useSelector(
    state => state.messageReducer.listTopicChat,
  );
  const fetchListTopicChat = useCallback(async () => {
    const res = await getMyChats();
    dispatch(getListTopicChat({ listTopicChat: res.data.data }));
  }, [dispatch]);

  return { fetchListTopicChat, listTopicChat };
};

export default useFetchListTopicChat;
