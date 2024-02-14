'use client';
import React from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { FormControl, InputLabel } from '@mui/material';

type User = {
  id: string;
  name: string;
};

type UserListProps = {
  users: User[];
  handleSelectUser: (user: string) => void;
  selectedUserId: string;
};

const UserList = ({
  users,
  handleSelectUser,
  selectedUserId
}: UserListProps) => {
  return (
    <FormControl>
      <InputLabel id="demo-simple-select-label">Select User</InputLabel>
      <Select
        label="Select User"
        value={selectedUserId}
        onChange={(event) => handleSelectUser(event.target.value)}
      >
        {users?.map((user) => (
          <MenuItem key={user.id} value={user.id}>
            {user.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default UserList;
