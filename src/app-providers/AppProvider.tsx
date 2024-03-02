'use client';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ThemeProvider } from './ThemeProvider';
import { Provider } from 'react-redux';
// import { persistor } from '../redux/store';
import { store } from '../redux/store';
import { SnackbarProvider } from 'notistack';
import { PersistGate } from 'redux-persist/integration/react';

type Prop = {
  children: JSX.Element;
};

const AppProvider: React.FC<Prop> = ({ children }): JSX.Element => {
  return (
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={persistor}> */}
      <AppRouterCacheProvider>
        <SnackbarProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </SnackbarProvider>
      </AppRouterCacheProvider>
      {/* </PersistGate> */}
    </Provider>
  );
};

export default AppProvider;
