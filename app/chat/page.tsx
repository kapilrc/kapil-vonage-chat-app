'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const ChatPage = () => {
  return (
    <div>
      <TextField label="Chat Message" />
      <Button variant="contained">Send</Button>
    </div>
  );
};

export default ChatPage;
