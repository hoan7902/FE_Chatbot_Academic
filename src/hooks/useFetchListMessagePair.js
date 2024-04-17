import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setConversationId } from '../features/Message/slice';
import { fetchDataListMessagePair } from '../features/Message/thunk';

const useFetchListMessagePair = () => {
  const listTopicChat = useSelector(
    state => state.messageReducer.listTopicChat,
  );
  const dispatch = useDispatch();
  const handleSetIdAndFetchData = useCallback(() => {
    if (listTopicChat && listTopicChat.length > 0) {
      dispatch(setConversationId({ conversationId: listTopicChat[0]?.id }));
      dispatch(
        fetchDataListMessagePair({
          conversationId: listTopicChat[0]?.id,
        }),
      );
    }
  }, [listTopicChat, dispatch]);

  return { handleSetIdAndFetchData, listTopicChat };
};

export default useFetchListMessagePair;
