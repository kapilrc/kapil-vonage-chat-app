'use client';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ThemeProvider } from './ThemeProvider';
import { Provider } from 'react-redux';
import { AppStore, store } from '../redux/store';
import { SnackbarProvider } from 'notistack';
import { useRef } from 'react';

type Prop = {
  children: JSX.Element;
};

const AppProvider: React.FC<Prop> = ({ children }): JSX.Element => {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = store();
  }
  return (
    <Provider store={storeRef.current}>
      <AppRouterCacheProvider>
        <SnackbarProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </SnackbarProvider>
      </AppRouterCacheProvider>
    </Provider>
  );
};

export default AppProvider;
