'use client';
import { useEffect, useState } from 'react';
import { TextField, Button, Stack } from '@mui/material';
import { useRouter } from 'next/navigation';
import { enqueueSnackbar } from 'notistack';
import { useCreateConversationMutation } from '../redux/apiChatRoom';

const CreateChatRoom = () => {
  const [ChatRoomName, setChatRoomName] = useState<string>('');
  const [createConversation, { data, isLoading, error }] =
    useCreateConversationMutation({});

  useEffect(() => {
    if (error && 'status' in error) {
      const errMsg =
        'error' in error ? error.error : JSON.stringify(error.data);
      enqueueSnackbar(errMsg, { variant: 'error' });
    }
  }, [error]);

  useEffect(() => {
    if (data) {
      enqueueSnackbar('Chat room created successfully!', {
        variant: 'success'
      });
    }
  }, [data]);

  const handleChatRoomNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setChatRoomName(event.target.value);
  };

  const handleCreateChatRoom = async () => {
    createConversation({
      name: ChatRoomName,
      display_name: ChatRoomName
    });
    setChatRoomName('');
  };

  return (
    <Stack
      spacing={3}
      direction="row"
      justifyContent="space-between"
      alignItems="center"
    >
      <TextField
        label="Chat room name"
        value={ChatRoomName}
        onChange={handleChatRoomNameChange}
      />
      <Button
        variant="contained"
        onClick={handleCreateChatRoom}
        disabled={ChatRoomName.length < 3 || isLoading}
      >
        {isLoading ? 'Creating Chat Room...' : 'Create Chat Room'}
      </Button>
    </Stack>
  );
};

export default CreateChatRoom;
