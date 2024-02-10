import { ThemeProvider as MuiProvider } from '@mui/material/styles';
import GlobalStyles from '@mui/material/GlobalStyles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '../theme';

const inputGlobalStyles = (
  <GlobalStyles
    styles={{
      a: { color: 'inherit', textDecoration: 'none' },
      '&::-webkit-scrollbar': {
        width: 7,
        height: 5
      },
      '&::-webkit-scrollbar-track': {
        boxShadow: `inset 0 0 6px rgba(0, 0, 0, 0.15)`
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: 'silver',
        borderRadius: '5px'
      },
      '.ellipse': {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical'
      },
      '._1line': {
        WebkitLineClamp: '1'
      },
      '._2lines': {
        WebkitLineClamp: '2'
      },
      '._3lines': {
        WebkitLineClamp: '3'
      }
    }}
  />
);

type Prop = {
  children: JSX.Element;
};

export const ThemeProvider: React.FC<Prop> = ({ children }) => (
  <MuiProvider theme={theme}>
    <CssBaseline />
    {inputGlobalStyles}

    {children}
  </MuiProvider>
);
