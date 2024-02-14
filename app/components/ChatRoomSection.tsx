'use client';
import React, { useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import CreateChatRoom from './CreateChatRoom';
import ChatRoomList from './ChatRoomList';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { useGetConversationsQuery } from '../redux/apiChatRoom';
import {
  selectedConversationId as currentConversationId,
  setAllCoversations,
  setConversationId
} from '../redux/chatRoomSlice';
import useAuth from '../hooks/useAuth';
import { getUserById, setToken } from '../redux/userSlice';
import { useGenerateTokenMutation } from '../redux/apiToken';

const ChatRoomSection = () => {
  const [ChatRoomName, setChatRoomName] = useState('');
  const { data, isLoading, isError } = useGetConversationsQuery({});
  const [generateToken, { data: token }] = useGenerateTokenMutation({});

  const currentUser = useAppSelector(getUserById);
  const selectedConversationId = useAppSelector(currentConversationId);

  const dispatch = useAppDispatch();
  const { login } = useAuth();

  const handleSelectChatRoom = (userId: string) => {
    dispatch(setConversationId(userId));
  };

  useEffect(() => {
    dispatch(setAllCoversations);
  }, [data?.conversations, dispatch]);

  useEffect(() => {
    if (currentUser?.id) {
      generateToken({
        name: currentUser.name
      });
    }
  }, [currentUser?.id]);

  useEffect(() => {
    if (token) {
      dispatch(setToken(token?.jwt));
      login(token?.jwt);
    }
  }, [token?.jwt]);

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
