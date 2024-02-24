'use client';
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import MuiToolbar from '@mui/material/Toolbar';
import { Typography, styled } from '@mui/material';
import MoreActions from './MoreActions';

const Toolbar = styled(MuiToolbar)(({ theme }) => ({
  '>a': {
    marginRight: theme.spacing(1.5),
    display: 'inline-block',
    ':hover': {
      textDecoration: 'underline'
    },
    [theme.breakpoints.up('sm')]: {
      marginRight: theme.spacing(5)
    }
  }
}));

type NavBarProps = {
  showLogout?: boolean;
  name?: string;
  conversation?: string;
};

const Navbar = ({ children }) => {
  return (
    <AppBar position="fixed" color="primary">
      <Container maxWidth="xs">
        <Toolbar disableGutters>{children}</Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
