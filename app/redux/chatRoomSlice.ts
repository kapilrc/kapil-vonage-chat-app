import { createSlice, createSelector } from '@reduxjs/toolkit';
import { RootState } from './store';
import { CreateConversationApiResp } from './apiChatRoom';

const initialState = {
  allConversations: [] as CreateConversationApiResp[],
  selectedConversationId: ''
};

export const chatRoomSlice = createSlice({
  name: 'chatRoomSlice',
  initialState,
  reducers: {
    setAllCoversations: (state, action) => {
      state.allConversations = action.payload;
    },
    setConversationId: (state, action) => {
      state.selectedConversationId = action.payload;
    }
  },
  extraReducers: (builder) => {}
});

export const { setAllCoversations, setConversationId } = chatRoomSlice.actions;

export const allConversations = (state: RootState) =>
  state.chatRoomSlice.allConversations;

export const selectedConversationId = (state: RootState) =>
  state.chatRoomSlice.selectedConversationId;

export const getConversationById = (
  state: RootState
): CreateConversationApiResp =>
  state.chatRoomSlice.allConversations?.find(
    (conversation) => conversation.id == selectedConversationId
  ) as CreateConversationApiResp;
