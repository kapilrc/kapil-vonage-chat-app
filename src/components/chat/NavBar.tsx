'use client';
import React from 'react';
import useAuth from '../../hooks/useAuth';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';

import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  selectedConversation,
  setConversation
} from '../../redux/chatRoomSlice';
import { getUserById } from '../../redux/userSlice';
import MuiNavbar from '../NavBar';
import { useRouter } from 'next/router';

const NavBar = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { logout } = useAuth();
  const currentConversation = useAppSelector(selectedConversation);
  const user = useAppSelector(getUserById);

  const onLogout = () => {
    dispatch(setConversation(null));
    logout();
  };

  return (
    <MuiNavbar>
      <Stack direction="row" spacing={2} alignItems="center">
        <IconButton
          onClick={() => {
            router.push('/');
          }}
        >
          <ArrowBackRoundedIcon sx={{ color: '#fff' }} />
        </IconButton>
        <Typography>{user?.name}</Typography>
        <Typography>Room: {currentConversation?.name}</Typography>
        {/* <IconButton onClick={onLogout}>
          <LogoutRoundedIcon sx={{ color: '#fff' }} />
        </IconButton> */}
      </Stack>
      <Box sx={{ flexGrow: 1 }} />
    </MuiNavbar>
  );
};

export default NavBar;
