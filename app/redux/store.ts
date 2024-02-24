import {
  Action,
  ThunkAction,
  combineReducers,
  configureStore
} from '@reduxjs/toolkit';
// import { persistReducer, persistStore } from 'redux-persist';
import { apiChat } from './apiChat';
import { userSlice } from './userSlice';
import { chatRoomSlice } from './chatRoomSlice';
import { messagesSlice } from './messagesSlice';
import { setupListeners } from '@reduxjs/toolkit/query';
// import storage from 'redux-persist/lib/storage';

// const persistConfig = {
//   key: 'root',
//   version: 1,
//   storage: storage
// };

const rootReducer = combineReducers({
  [apiChat.reducerPath]: apiChat.reducer,
  [userSlice.name]: userSlice.reducer,
  [chatRoomSlice.name]: chatRoomSlice.reducer,
  [messagesSlice.name]: messagesSlice.reducer
});

// WIP: https://redux-toolkit.js.org/usage/usage-guide#working-with-non-serializable-data
// const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiChat.middleware),
  devTools: process.env.NODE_ENV !== 'production'
});

setupListeners(store.dispatch);

// export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// export type AppThunk<ReturnType = void> = ThunkAction<
//   ReturnType,
//   RootState,
//   unknown,
//   Action<string>
// >;
