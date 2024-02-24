import { RootState } from './store';
import {
  createSlice,
  createSelector,
  createEntityAdapter
} from '@reduxjs/toolkit';
import {
  CreateConversationApiResp,
  conversationByIDResp,
  conversationsResp,
  enhancedApi
} from './apiChatRoom';

const conversationsAdapter = createEntityAdapter<CreateConversationApiResp>({});

const initialState = {
  ...conversationsAdapter.getInitialState(),
  selectedConversationId: '',
  conversation: null
};

export const chatRoomSlice = createSlice({
  name: 'chatRoomSlice',
  initialState,
  reducers: {
    // setAllCoversations: (state, action) => {
    //   state.allConversations = action.payload;
    // },
    setConversation: (state, action) => {
      state.conversation = action.payload;
    },
    setConversationId: (state, action) => {
      state.selectedConversationId = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      enhancedApi.endpoints.getConversations.matchFulfilled,
      (state, { payload }: { payload: conversationsResp }) => {
        conversationsAdapter.upsertMany(state, payload.conversations);
      }
    );
    builder.addMatcher(
      enhancedApi.endpoints.getConversationById.matchFulfilled,
      (state, { payload }: { payload: conversationByIDResp }) => {
        conversationsAdapter.setOne(state, payload);
      }
    );
  }
});

export const { setConversation, setConversationId } = chatRoomSlice.actions;

export const {
  selectAll: selectAllConvesations,
  selectById: selectedConversationById,
  selectEntities
} = conversationsAdapter.getSelectors(
  (state: RootState) => state.chatRoomSlice ?? initialState
);

export const chatConversation = (state: RootState) =>
  state?.chatRoomSlice?.conversation;

export const selectedConversationId = (state: RootState) =>
  state?.chatRoomSlice?.selectedConversationId;

export const selectedConversation = (state: RootState) =>
  createSelector(
    (state: RootState) => {
      return state?.chatRoomSlice?.selectedConversationId;
    },
    (id) => {
      return state?.chatRoomSlice?.entities[id];
    }
  )(state);
