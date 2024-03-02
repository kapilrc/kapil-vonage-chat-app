'use client';
import React, { useRef, useState } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import MuiContainer from '@mui/material/Container';
import MuiTextField from '@mui/material/TextField';
import { styled } from '@mui/material';

import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { submitInputText } from '../../redux/messagesSlice';

const Container = styled(MuiContainer)(({ theme }) => ({
  padding: theme.spacing(1, 3, 0.5),
  borderTop: `1px solid ${theme.palette.primary.main}`
}));

const TextField = styled(MuiTextField)(({ theme }) => ({
  minWidth: '90%',
  '.MuiInputBase-root': {
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: 10,
    input: {
      padding: theme.spacing(1.3)
    }
  }
}));

const TypeMessageSection = () => {
  const dispatch = useAppDispatch();
  const [inputText, setInputText] = useState('');
  // const inputText = useAppSelector((state) => state.messagesSlice.inputText);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputText) return;

    await dispatch(submitInputText(inputText));
    setInputText('');
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <Stack
          spacing={1}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <TextField
            type="text"
            value={inputText}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setInputText(e?.target?.value)
            }
            autoComplete="off"
            placeholder="Type a message..."
          />
          <IconButton type="submit">
            <SendRoundedIcon />
          </IconButton>
        </Stack>
      </form>
    </Container>
  );
};

export default TypeMessageSection;
