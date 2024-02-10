'use client';
import Link from 'next/link';
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import MuiToolbar from '@mui/material/Toolbar';
import { styled } from '@mui/material';

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

const Navbar: React.FC = () => {
  return (
    <AppBar position="fixed" color="primary">
      <Container maxWidth="lg" disableGutters>
        <Toolbar>
          <Link href="/" rel="preload">
            ChatApp
          </Link>
          <Box sx={{ flexGrow: 1 }} />
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
