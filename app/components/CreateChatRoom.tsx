'use client';
import { useEffect, useState } from 'react';
import { TextField, Button, Stack } from '@mui/material';
import { useRouter } from 'next/navigation';
import { enqueueSnackbar } from 'notistack';
import { useCreateConversationMutation } from '../redux/apiChatRoom';

const CreateChatRoom = () => {
  const router = useRouter();
  const [ChatRoomName, setChatRoomName] = useState<string>('');
  const [createConversation, { data, isLoading, error }] =
    useCreateConversationMutation({});

  useEffect(() => {
    if (error) {
      enqueueSnackbar(error?.data?.description, { variant: 'error' });
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

  const handleCreateUser = async () => {
    createConversation({
      name: ChatRoomName,
      display_name: ChatRoomName
    });
  };

  return (
    <Stack spacing={3}>
      <TextField
        label="Chat room name"
        value={ChatRoomName}
        onChange={handleChatRoomNameChange}
      />
      <Button
        variant="contained"
        onClick={handleCreateUser}
        disabled={ChatRoomName.length < 3 || isLoading}
      >
        {isLoading ? 'Creating Chat Room...' : 'Create Chat Room'}
      </Button>
    </Stack>
  );
};

export default CreateChatRoom;
