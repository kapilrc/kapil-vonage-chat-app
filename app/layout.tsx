import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import AppProvider from './app-providers/AppProvider';
import Container from '@mui/material/Container';
import Navbar from './components/NavBar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Chat App',
  description: 'Generated by create next app'
};

export default function RootLayout({
  children
}: Readonly<{
  children: JSX.Element;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppProvider>
          <>
            <Navbar />
            <Container sx={{ marginTop: 12 }} maxWidth="xs">
              {children}
            </Container>
          </>
        </AppProvider>
      </body>
    </html>
  );
}