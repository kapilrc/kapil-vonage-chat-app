import { configureStore } from '@reduxjs/toolkit';
import { apiChat } from '../chat/apiChat';

export const store = () => {
  return configureStore({
    reducer: {
      [apiChat.reducerPath]: apiChat.reducer
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiChat.middleware),
    devTools: process.env.NODE_ENV !== 'production'
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
