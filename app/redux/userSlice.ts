import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';

const initialState = {
  selectedUserId: ''
};

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setSelectedUserId: (state, action) => {
      state.selectedUserId = action.payload;
    }
  },
  extraReducers: (builder) => {}
});

export const { setSelectedUserId } = userSlice.actions;

export const selectedUserId = (state: RootState) =>
  state.userSlice.selectedUserId as string;
