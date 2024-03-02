import Stack from '@mui/material/Stack';
import UserSection from '../components/UserSection';
import ChatRoomSection from '../components/ChatRoomSection';
import JoinChat from '../components/JoinChat';
import Navbar from '../components/NavBar';
import Link from 'next/link';
import RootLayout from '../components/RootLayout';

const Home = () => {
  return (
    <RootLayout>
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
    </RootLayout>
  );
};

export default Home;
