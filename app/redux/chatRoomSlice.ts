import { createSlice, createSelector } from '@reduxjs/toolkit';
import { RootState } from './store';

const initialState = {
  selectedConversationId: ''
};

export const chatRoomSlice = createSlice({
  name: 'chatRoomSlice',
  initialState,
  reducers: {
    setConversationId: (state, action) => {
      state.selectedConversationId = action.payload;
    }
  },
  extraReducers: (builder) => {}
});

export const { setConversationId } = chatRoomSlice.actions;

export const selectedConversationId = (state: RootState) =>
  state.chatRoomSlice.selectedConversationId as string;
