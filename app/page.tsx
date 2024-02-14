import Stack from '@mui/material/Stack';
import CreateUser from './components/CreateUserForm';
import UserSection from './components/UserSection';
import ChatRoomSection from './components/ChatRoomSection';

const Home = () => {
  return (
    <Stack spacing={3}>
      <UserSection />
      <ChatRoomSection />
    </Stack>
  );
};

export default Home;
