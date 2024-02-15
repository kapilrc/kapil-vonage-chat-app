'use client';
import React, { useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CreateUser from './CreateUserForm';
import UserList from './UserList';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { useGetUsersQuery } from '../redux/apiUser';
import {
  selectedUserId as currentUser,
  // setAllUsers,
  setSelectedUserId
} from '../redux/userSlice';

const UserSection = () => {
  const { data, isLoading, isError } = useGetUsersQuery({});

  const selectedUserId = useAppSelector(currentUser);

  const dispatch = useAppDispatch();
  const handleSelectUser = (userId: string) => {
    dispatch(setSelectedUserId(userId));
  };

  // useEffect(() => {
  //   dispatch(setAllUsers());
  // }, [data?.users, dispatch]);

  return (
    <Stack spacing={3}>
      {/* get the list of users created */}
      <UserList
        users={data?.users}
        handleSelectUser={handleSelectUser}
        selectedUserId={selectedUserId}
      />

      {/* selected user is shown as connected */}
      {selectedUserId ? (
        <Typography>{`Login as : ${
          data?.users?.find((user) => user?.id === selectedUserId)?.name
        }`}</Typography>
      ) : // Create user form
      // <CreateUser />
      null}

      {/* Create user form */}
      <CreateUser />
    </Stack>
  );
};

export default UserSection;
