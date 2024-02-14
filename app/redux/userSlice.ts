import { createSlice, createSelector } from '@reduxjs/toolkit';
import { RootState } from './store';
import { apiUser } from './apiUser';

const initialState = {
  allUsers: [] as apiUser[],
  selectedUserId: '',
  token: '',
  session: null
};

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setAllUsers: (state, action) => {
      state.allUsers = action.payload;
    },
    setSelectedUserId: (state, action) => {
      state.selectedUserId = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setSession: (state, action) => {
      state.session = action.payload;
    }
  },
  extraReducers: (builder) => {}
});

export const { setAllUsers, setSelectedUserId, setToken, setSession } =
  userSlice.actions;

export const selectedUserId = (state: RootState) =>
  state.userSlice.selectedUserId;

export const allUsers = (state: RootState) => state.userSlice.allUsers;

export const getUserById = (state: RootState): apiUser =>
  state.userSlice.allUsers?.find(
    (user) => user.id == selectedUserId
  ) as apiUser;

export const token = (state: RootState) => state.userSlice.token;

export const session = (state: RootState) => state.userSlice.session;
