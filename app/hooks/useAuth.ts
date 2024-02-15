import NexmoClient from 'nexmo-client';
import { useGenerateTokenMutation } from '../redux/apiToken';
import {
  selectedConversation,
  setConversationId
} from '../redux/chatRoomSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import {
  getUserById,
  selectedUserId,
  setSelectedUserId,
  setSession,
  setToken,
  token
} from '../redux/userSlice';
import { useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const useAuth = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [generateToken, { data }] = useGenerateTokenMutation({});

  const currentUser = useAppSelector(getUserById);
  const currentConversation = useAppSelector(selectedConversation);
  const jwtToken = useAppSelector(token);

  // prevent change on every render
  const login = useCallback(async (jwtToken: string) => {
    try {
      let nexmoClient = new NexmoClient({});
      const session = await nexmoClient.createSession(jwtToken);
      dispatch(setSession(session));
    } catch (err) {
      // generate new token for different session
      generateToken({
        name: currentUser?.name
      });
    }
  }, []);

  const logout = () => {
    dispatch(setConversationId(''));
    dispatch(setSelectedUserId(''));
    dispatch(setToken(''));
    router.push('/');
  };

  useEffect(() => {
    if (data?.jwt || jwtToken) {
      login(data?.jwt || jwtToken);
    }
  }, [data, jwtToken, login]);

  return { login, jwtToken, currentConversation, currentUser, logout };
};

export default useAuth;
