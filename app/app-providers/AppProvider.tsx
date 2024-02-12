'use client';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ThemeProvider } from './ThemeProvider';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { SnackbarProvider } from 'notistack';

type Prop = {
  children: JSX.Element;
};

const AppProvider: React.FC<Prop> = ({ children }): JSX.Element => {
  return (
    <Provider store={store}>
      <AppRouterCacheProvider>
        <SnackbarProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </SnackbarProvider>
      </AppRouterCacheProvider>
    </Provider>
  );
};

export default AppProvider;
