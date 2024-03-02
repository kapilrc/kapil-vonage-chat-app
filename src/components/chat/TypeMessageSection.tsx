'use client';
import React, { useRef, useState } from 'react';
import { Box, IconButton, Stack, styled } from '@mui/material';
import MuiTextField from '@mui/material/TextField';

import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { submitInputText } from '../../redux/messagesSlice';

const Wrapper = styled(Box)(({ theme }) => ({
  border: '1px solid',
  padding: theme.spacing(2)
}));

const TextField = styled(MuiTextField)(({ theme }) => ({
  minWidth: '80%'
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
    <Wrapper>
      <form onSubmit={handleSubmit}>
        <Stack
          spacing={3}
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
            placeholder="Type a message..."
          />
          <IconButton type="submit">
            <SendRoundedIcon />
          </IconButton>
        </Stack>
      </form>
    </Wrapper>
  );
};

export default TypeMessageSection;
