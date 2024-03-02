'use client';
import IconButton from '@mui/material/IconButton';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import useAuth from '../hooks/useAuth';
import { useRouter } from 'next/navigation';

const MoreActions: React.FC = () => {
  const router = useRouter();
  const { logout } = useAuth();

  const onLogout = () => {
    // setConversation(null);
    logout();
    router.push('/');
  };

  return (
    <IconButton onClick={onLogout}>
      {/* color="primary" */}
      <LogoutRoundedIcon sx={{ color: '#fff' }} />
    </IconButton>
  );
};

export default MoreActions;
