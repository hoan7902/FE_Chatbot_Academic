import { configureStore, applyMiddleware } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import messageReducer from './features/Message/slice'

const store = configureStore({
  reducer: {
    messageReducer,
  },
}, applyMiddleware(thunk))

Object.defineProperty(window, 'reduxStore', {
  get() {
    return store.getState();
  },
});

export default store
