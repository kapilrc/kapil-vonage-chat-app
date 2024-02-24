import NexmoClient from 'nexmo-client';
import { useGenerateTokenMutation } from '../redux/apiToken';
import {
  selectedConversation,
  setConversationId
} from '../redux/chatRoomSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import {
  getUserById,
  setSelectedUserId,
  setSession,
  setToken,
  token
} from '../redux/userSlice';
import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const useAuth = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [generateToken, { data }] = useGenerateTokenMutation({});

  const currentUser = useAppSelector(getUserById);
  const currentConversation = useAppSelector(selectedConversation);
  const jwtToken = useAppSelector(token);

  // prevent change on every render
  const login = useCallback(async (jwtToken: string) => {
    try {
      setLoading(true);
      let nexmoClient = new NexmoClient();
      const session = await nexmoClient.createSession(jwtToken);
      dispatch(setSession(session));
      setLoading(false);
    } catch (err) {
      setLoading(false);
      if (err.type == 'session:error:max-open-sessions') return;
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
      setLoading(true);
      login(data?.jwt || jwtToken);
    }
  }, [data, jwtToken, login]);

  return { loading, login, jwtToken, currentConversation, currentUser, logout };
};

export default useAuth;
