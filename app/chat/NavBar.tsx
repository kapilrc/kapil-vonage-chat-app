'use client';
import React from 'react';
import useAuth from '../hooks/useAuth';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';

import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { selectedConversation, setConversation } from '../redux/chatRoomSlice';
import { getUserById } from '../redux/userSlice';
import MuiNavbar from '../components/NavBar';

const NavBar = () => {
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
      <Stack direction="row" spacing={2}>
        <Typography>Name: {user?.name}</Typography>
        <Typography>Room: {currentConversation?.name}</Typography>
      </Stack>
      <Box sx={{ flexGrow: 1 }} />
      <IconButton onClick={onLogout}>
        {/* color="primary" */}
        <LogoutRoundedIcon sx={{ color: '#fff' }} />
      </IconButton>
    </MuiNavbar>
  );
};

export default NavBar;
