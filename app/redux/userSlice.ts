import {
  createSlice,
  createSelector,
  createEntityAdapter
} from '@reduxjs/toolkit';
import { RootState } from './store';
import { GetUserByIdResp, GetUsersResp, apiUser, userApi } from './apiUser';
// import { Application } from 'nexmo-client';

const userAdapter = createEntityAdapter<apiUser>();
const initialState = {
  ...userAdapter.getInitialState(),
  selectedUserId: '',
  token: '',
  session: null
};

const usersAdapter = createEntityAdapter<apiUser>();
export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    // setAllUsers: (state, action) => {
    //   state.allUsers = action.payload;
    // },
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
  extraReducers: (builder) => {
    builder.addMatcher(
      userApi.endpoints.getUsers.matchFulfilled,
      (state, { payload }: { payload: GetUsersResp }) => {
        userAdapter.upsertMany(state, payload.users);
      }
    );
    builder.addMatcher(
      userApi.endpoints.getUserById.matchFulfilled,
      (state, { payload }: { payload: GetUserByIdResp }) => {
        userAdapter.setOne(state, payload);
      }
    );
  }
});

export const { setSelectedUserId, setToken, setSession } = userSlice.actions;

export const selectedUserId = (state: RootState) =>
  state.userSlice.selectedUserId;

// export const allUsers = (state: RootState) => state.userSlice.allUsers;
export const { selectAll, selectById, selectEntities } =
  usersAdapter.getSelectors(
    (state: RootState) => state.userSlice ?? initialState
  );

export const getUserById = (state: RootState) =>
  createSelector(
    (state: RootState) => state?.userSlice?.selectedUserId,
    (id) => {
      return state?.userSlice?.entities[id];
    }
  )(state);

export const token = (state: RootState) => state.userSlice.token;

export const session = (state: RootState) => state.userSlice.session;
