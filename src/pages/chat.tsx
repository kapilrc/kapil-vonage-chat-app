import React from 'react';
import MuiStack from '@mui/material/Stack';
import TypeMessageSection from '../components/chat/TypeMessageSection';
import ConversationSection from '../components/chat/ConversationSection';
import NavBar from '../components/chat/NavBar';
import { Container, styled } from '@mui/material';
import RootLayout from '../components/RootLayout';

const Stack = styled(MuiStack)(({ theme }) => ({
  marginTop: theme.spacing(8),
  height: `calc(100vh - ${theme.spacing(8)})`
}));

const ChatPage = () => {
  return (
    <RootLayout>
      <NavBar />
      <Stack justifyContent="space-between">
        {/* chat messages */}
        <ConversationSection />

        {/* Type message container */}
        <TypeMessageSection />
      </Stack>
    </RootLayout>
  );
};

export default ChatPage;
