'use client';
import React from 'react';
import Stack from '@mui/material/Stack';
import CreateUser from './CreateUserForm';
import UserList from './UserList';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { useGetUsersQuery } from '../redux/apiUser';
import {
  selectedUserId as currentUser,
  setSelectedUserId
} from '../redux/userSlice';
import { Typography } from '@mui/material';

const UserSection = () => {
  const { data, isLoading, isError } = useGetUsersQuery({});

  const selectedUserId = useAppSelector(currentUser);

  const dispatch = useAppDispatch();
  const handleSelectUser = (userId: string) => {
    dispatch(setSelectedUserId(userId));
  };

  return (
    <Stack spacing={3}>
      {/* get the list of users created */}
      <UserList
        users={data?.users}
        handleSelectUser={handleSelectUser}
        selectedUserId={selectedUserId}
      />

      {/* selected user is shown as connected */}
      {selectedUserId && (
        <Typography>{`Connected as : ${
          data?.users?.find((user) => user?.id === selectedUserId)?.name
        }`}</Typography>
      )}

      {/* Create user form */}
      <CreateUser />
    </Stack>
  );
};

export default UserSection;
