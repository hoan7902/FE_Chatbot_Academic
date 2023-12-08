import { createSlice } from '@reduxjs/toolkit'

export const messageSlice = createSlice({
  name: 'message',
  initialState: {
    messagepair: {},
    currentUserMessage: '',
    currentResponseMessage: '',
    listUserMessage: [],
    listChatBoxMessage: [],
    listMessagePair: [],
    listTopicChat: [],
    contextTopicKey: '',
  },
  reducers: {
    getListUserMessenger: (state, action) => {
      state.listUserMessage = [action.payload.message, ...state.listUserMessage]
    },
    getListResponseMessenger: (state, action) => {
      state.listChatBoxMessage = [action.payload.message, ...state.listChatBoxMessage]
    },
    getCurrentUserMessage: (state, action) => {
      state.currentUserMessage = action.payload.message
    },
    deleteCurrentUserMessage: (state) => {
      state.currentUserMessage = ''
    },
    getCurrentReponseMessage: (state, action) => {
      state.currentResponseMessage = action.payload.message
    },
    deleteCurrentReponseMessage: (state) => {
      state.currentResponseMessage = ''
    },
    getMessagePair: (state) => {
      state.messagepair = {
        question: state.currentUserMessage,
        response: state.currentResponseMessage,
      }
    },
    getListMessagePair: (state) => {
      const newMessage = {
        question: state.currentUserMessage,
        response: state.currentResponseMessage,
      }
      if (newMessage.question) {
        state.listMessagePair = [...state.listMessagePair, newMessage]
      }
    },
    getListTopicChat: (state, action) => {
      state.listTopicChat = action.payload.listTopicChat
    },
    getContextTopicKey: (state, action) => {
      state.contextTopicKey = action.payload.contextTopicKey
    },
    resetAllStates: (state) => {
      state.messagepair = {};
      state.currentUserMessage = '';
      state.currentResponseMessage = '';
      state.listUserMessage = [];
      state.listChatBoxMessage = [];
      state.listMessagePair = [];
      // state.listTopicChat = []; // Cái này k cần reset
      state.contextTopicKey = '';
    },
  },
})
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
  getContextTopicKey,
  resetAllStates,
} = messageSlice.actions

export default messageSlice.reducer
