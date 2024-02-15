import {
  Action,
  ThunkAction,
  combineReducers,
  configureStore
} from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE
} from 'redux-persist';
import { apiChat } from './apiChat';
import { userSlice } from './userSlice';
import { chatRoomSlice } from './chatRoomSlice';
import { messagesSlice } from './messagesSlice';

const persistConfig = {
  key: 'root',
  storage: storage
};

const rootReducer = combineReducers({
  [apiChat.reducerPath]: apiChat.reducer,
  [userSlice.name]: userSlice.reducer,
  [chatRoomSlice.name]: chatRoomSlice.reducer,
  [messagesSlice.name]: messagesSlice.reducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
// we can combine reducers as well
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    }).concat(apiChat.middleware),
  devTools: process.env.NODE_ENV !== 'production'
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
