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
  },
  reducers: {
    getListUserMessenger: (state, action) => {
      state.listUserMessage = [action.payload.message, ...state.listUserMessage]
    },
    getListResponseMessenger: (state, action) => {
      state.listUserMessage = [action.payload.message, ...state.listChatBoxMessage]
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
      console.log('check newMessage: ', newMessage)
      if (newMessage.question) {
        state.listMessagePair = [...state.listMessagePair, newMessage]
      }
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
} = messageSlice.actions

export default messageSlice.reducer
