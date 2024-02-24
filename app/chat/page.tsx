'use client';
import React from 'react';
import Stack from '@mui/material/Stack';
import TypeMessageSection from './TypeMessageSection';
import ConversationSection from './ConversationSection';
import NavBar from './NavBar';

const ChatPage = () => {
  return (
    <>
      <NavBar />
      <Stack justifyContent="space-between" mt={7}>
        {/* chat messages */}
        <ConversationSection />

        {/* Type message container */}
        <TypeMessageSection />
      </Stack>
    </>
  );
};

export default ChatPage;
