import Stack from '@mui/material/Stack';
import UserSection from './components/UserSection';
import ChatRoomSection from './components/ChatRoomSection';
import JoinChat from './components/JoinChat';
import Navbar from './components/NavBar';
import Link from 'next/link';

const Home = () => {
  return (
    <>
      <Navbar>
        <Link href="/" rel="preload">
          ChatApp
        </Link>
      </Navbar>
      <Stack spacing={10} mt={12} p={2}>
        <UserSection />
        <ChatRoomSection />
        <JoinChat />
      </Stack>
    </>
  );
};

export default Home;
