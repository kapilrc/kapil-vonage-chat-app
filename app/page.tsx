import Stack from '@mui/material/Stack';
import CreateUser from './components/CreateUserForm';
import UserSection from './components/UserSection';

const Home = () => {
  return (
    <Stack spacing={3}>
      <UserSection />
    </Stack>
  );
};

export default Home;
