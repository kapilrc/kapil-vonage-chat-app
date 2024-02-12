'use client';
import { useState } from 'react';
import { TextField, Button, Stack } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useCreateUserMutation } from './api';
import { enqueueSnackbar } from 'notistack';

const Home = () => {
  const router = useRouter();
  const [name, setName] = useState<string>('');
  const [createUser, { isLoading }] = useCreateUserMutation();

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleCreateUser = async () => {
    // create username - wip
    try {
      const data = await createUser({ username: name }).unwrap();
      console.log(data);
      router.push('/chat');
    } catch (error: any) {
      let message = error?.data?.detail || 'Unknown Error';
      enqueueSnackbar(message, {
        variant: 'error'
      });
    }
  };

  return (
    <Stack spacing={3}>
      <TextField label="Username" value={name} onChange={handleNameChange} />
      <Button
        variant="contained"
        onClick={handleCreateUser}
        disabled={name.length < 3 || isLoading}
      >
        {isLoading ? 'Creating user...' : 'Create User'}
      </Button>
    </Stack>
  );
};

export default Home;
