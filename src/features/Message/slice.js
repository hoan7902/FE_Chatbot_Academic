import { createSlice } from '@reduxjs/toolkit';

export const messageSlice = createSlice({
  name: 'message',
  initialState: {
    messagepair: {},
    currentUserMessage: '',
    currentResponseMessage: '',
    listUserMessage: [],
    listChatBoxMessage: [],
    listMessagePair: [],
    listTopicChat: undefined,
    conversationId: '',
  },
  reducers: {
    // use to add new message to list
    getListUserMessenger: (state, action) => {
      state.listUserMessage = [
        action.payload.message,
        ...state.listUserMessage,
      ];
    },
    // use to fetch list message from api
    fetchListUserMessenger: (state, action) => {
      state.listUserMessage = action.payload.listUserMessage;
    },
    // use to add new message to list
    getListResponseMessenger: (state, action) => {
      state.listChatBoxMessage = [
        action.payload.message,
        ...state.listChatBoxMessage,
      ];
    },
    // use to fetch list message from api
    fetchListResponseMessenger: (state, action) => {
      state.listChatBoxMessage = action.payload.listChatBoxMessage;
    },
    // use to update current message user
    getCurrentUserMessage: (state, action) => {
      state.currentUserMessage = action.payload.message;
    },
    deleteCurrentUserMessage: (state) => {
      state.currentUserMessage = '';
    },
    // use to update current message chatbot
    getCurrentReponseMessage: (state, action) => {
      state.currentResponseMessage = action.payload.message;
    },
    deleteCurrentReponseMessage: (state) => {
      state.currentResponseMessage = '';
    },
    // maybe not use:vv
    getMessagePair: (state) => {
      state.messagepair = {
        question: state.currentUserMessage,
        response: state.currentResponseMessage,
      };
    },
    // add current pair chat to list pair
    getListMessagePair: (state) => {
      const newMessage = {
        question: state.currentUserMessage,
        response: state.currentResponseMessage,
      };
      if (newMessage.question) {
        state.listMessagePair = [...state.listMessagePair, newMessage];
      }
    },
    fetchListMessagePair: (state, action) => {
      state.listMessagePair = action.payload.listMessagePair;
    },
    getListTopicChat: (state, action) => {
      state.listTopicChat = action.payload.listTopicChat;
    },
    setConversationId: (state, action) => {
      state.conversationId = action.payload.conversationId;
    },
    resetAllStates: (state) => {
      state.messagepair = {};
      state.currentUserMessage = '';
      state.currentResponseMessage = '';
      state.listUserMessage = [];
      state.listChatBoxMessage = [];
      state.listMessagePair = [];
      // state.listTopicChat = []; // Cái này k cần reset
      state.conversationId = '';
    },
  },
});
export const {
  getListUserMessenger,
  getCurrentUserMessage,
  deleteCurrentUserMessage,
  getCurrentReponseMessage,
  deleteCurrentReponseMessage,
  getMessagePair,
  getListResponseMessenger,
  getListMessagePair,
  getListTopicChat,
  setConversationId,
  resetAllStates,
  fetchListMessagePair,
  fetchListUserMessenger,
  fetchListResponseMessenger,
} = messageSlice.actions;

export default messageSlice.reducer;
