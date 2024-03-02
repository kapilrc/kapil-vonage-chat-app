import React from 'react';
import Stack from '@mui/material/Stack';
import TypeMessageSection from '../components/chat/TypeMessageSection';
import ConversationSection from '../components/chat/ConversationSection';
import NavBar from '../components/chat/NavBar';
import { Container } from '@mui/material';
import RootLayout from '../components/RootLayout';

const ChatPage = () => {
  return (
    <RootLayout>
      <NavBar />
      <Container>
        <Stack justifyContent="space-between" mt={7}>
          {/* chat messages */}
          <ConversationSection />

          {/* Type message container */}
          <TypeMessageSection />
        </Stack>
      </Container>
    </RootLayout>
  );
};

export default ChatPage;
