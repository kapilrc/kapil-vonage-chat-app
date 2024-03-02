import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { RootState } from './store';

export type MessageProps = {
  text: string;
  time: string;
  sender: string;
  id: string;
  key: string;
  userId: string;
  conversationId: string;
};

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
  ] as MessageProps[],
  inputText: ''
});

export const messagesSlice = createSlice({
  name: 'messagesSlice',
  initialState,
  reducers: {
    saveMessages: (state, action) => {
      state.messages = action.payload;
    },
    submitInputText: (state, action) => {
      state.inputText = action.payload;
      console.log('Submitted text:', state.inputText);
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

export const inputText = (state: RootState) => state.messagesSlice.inputText;
export const { saveMessages, submitInputText } = messagesSlice.actions;
