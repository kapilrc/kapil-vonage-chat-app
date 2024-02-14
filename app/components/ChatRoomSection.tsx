'use client';
import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import CreateChatRoom from './CreateChatRoom';
import ChatRoomList from './ChatRoomList';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { useGetConversationsQuery } from '../redux/apiChatRoom';
import {
  selectedConversationId as currentConversationId,
  setConversationId
} from '../redux/chatRoomSlice';

const ChatRoomSection = () => {
  const [ChatRoomName, setChatRoomName] = useState('');
  const { data, isLoading, isError } = useGetConversationsQuery({});

  const selectedConversationId = useAppSelector(currentConversationId);

  const dispatch = useAppDispatch();

  const handleSelectChatRoom = (userId: string) => {
    dispatch(setConversationId(userId));
  };

  return (
    <Stack spacing={3}>
      {/* get the list of chatrooms created */}
      <ChatRoomList
        conversations={data?.conversations}
        handleSelectChatRoom={handleSelectChatRoom}
        selectedChatRoomId={selectedConversationId}
      />

      {/* Create user form */}
      <CreateChatRoom />
    </Stack>
  );
};

export default ChatRoomSection;
