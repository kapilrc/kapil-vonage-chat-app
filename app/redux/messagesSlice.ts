import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { RootState } from './store';

const messagesAdapter = createEntityAdapter({});
const initialState = messagesAdapter.getInitialState({
  messages: [
    {
      text: '',
      time: '',
      sender: '',
      id: '',
      key: '',
      userId: '',
      conversationId: ''
    }
  ]
});

export const messagesSlice = createSlice({
  name: 'messagesSlice',
  initialState,
  reducers: {
    saveMessages: (state, action) => {
      state.messages = action.payload;
    }
  }
});

export const {
  selectAll: selectAllMessages,
  selectById,
  selectEntities
} = messagesAdapter.getSelectors((state) => state['userSlice'] ?? initialState);

export const getMessagesByConversationId = (state: RootState) => {
  return state.messagesSlice.messages.filter(
    (message) =>
      message.conversationId === state.chatRoomSlice.selectedConversationId
  );
};
export const { saveMessages } = messagesSlice.actions;
