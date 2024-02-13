'use client';
import { useState } from 'react';
import { TextField, Button, Stack } from '@mui/material';
import { useRouter } from 'next/navigation';
import { enqueueSnackbar } from 'notistack';
import { useCreateUserMutation } from '../redux/apiUser';

const CreateUser = () => {
  const router = useRouter();
  const [name, setName] = useState<string>('');
  const [createUser, { isLoading, error }] = useCreateUserMutation();

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleCreateUser = async () => {
    try {
      const data = await createUser({ name }).unwrap();
      console.log(data);
      // router.push('/chat');
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

export default CreateUser;
