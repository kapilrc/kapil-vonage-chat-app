import { configureStore } from '@reduxjs/toolkit';
import { apiChat } from '../chat/apiChat';
import { userSlice } from './userSlice';

export const store = configureStore({
  reducer: {
    [apiChat.reducerPath]: apiChat.reducer,
    [userSlice.name]: userSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiChat.middleware),
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
