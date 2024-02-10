'use client';
import { useState } from 'react';
import { TextField, Button, Stack } from '@mui/material';
import { useRouter } from 'next/navigation';

const Home = () => {
  const router = useRouter();
  const [name, setName] = useState<string>('');

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleCreateUser = () => {
    // create username - wip
    router.push('/chat');
  };

  return (
    <Stack spacing={3}>
      <TextField label="Username" value={name} onChange={handleNameChange} />
      <Button variant="contained" onClick={handleCreateUser}>
        Create User
      </Button>
    </Stack>
  );
};

export default Home;
