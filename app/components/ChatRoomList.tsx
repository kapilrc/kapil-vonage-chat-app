'use client';
import React from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { FormControl, InputLabel } from '@mui/material';
import { CreateConversationApiResp } from '../redux/apiChatRoom';

type ChatRoomListProps = {
  conversations: CreateConversationApiResp[];
  handleSelectChatRoom: (user: string) => void;
  selectedChatRoomId: string;
};

const ChatRoomList = ({
  conversations,
  handleSelectChatRoom,
  selectedChatRoomId
}: ChatRoomListProps) => {
  return (
    <FormControl>
      <InputLabel id="demo-simple-select-label">Select Chat Room</InputLabel>
      <Select
        label="Select Chat Room"
        value={selectedChatRoomId}
        onChange={(event) => handleSelectChatRoom(event.target.value)}
      >
        {conversations?.map((chat) => (
          <MenuItem key={chat.id} value={chat.id}>
            {chat.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default ChatRoomList;
