import { configureStore } from '@reduxjs/toolkit';
import { apiChat } from '../chat/apiChat';

export const store = configureStore({
  reducer: {
    [apiChat.reducerPath]: apiChat.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiChat.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
