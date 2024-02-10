'use client';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ThemeProvider } from './ThemeProvider';

type Prop = {
  children: JSX.Element;
};

const AppProvider: React.FC<Prop> = ({ children }) => {
  return (
    <AppRouterCacheProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </AppRouterCacheProvider>
  );
};

export default AppProvider;
