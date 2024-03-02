'use client';
import React from 'react';
import Button from '@mui/material/Button';
import { selectedUserId } from '../redux/userSlice';
import { useAppSelector } from '../redux/hooks';
import {
  // allConversations,
  selectedConversationId
} from '../redux/chatRoomSlice';
import { useRouter } from 'next/navigation';

const JoinChat = () => {
  const router = useRouter();
  const userId = useAppSelector(selectedUserId);
  const conversationId = useAppSelector(selectedConversationId);
  // const conversations = useAppSelector(allConversations);

  const handleLogin = () => {
    // const currentConversation = conversations?.find(
    //   (c) => c.id == conversationId
    // )?.name;
    // const slug = currentConversation?.split(' ').join('-')?.toLowerCase();
    router.push('/chat');
  };

  return (
    <>
      {userId && conversationId && (
        <Button onClick={handleLogin} variant="contained">
          Join Chat
        </Button>
      )}
    </>
  );
};

export default JoinChat;
