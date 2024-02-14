import NexmoClient from 'nexmo-client';
import { useGenerateTokenMutation } from '../redux/apiToken';
import {
  getConversationById,
  selectedConversationId
} from '../redux/chatRoomSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import {
  getUserById,
  selectedUserId,
  setSession,
  token
} from '../redux/userSlice';
import { useCallback, useEffect } from 'react';

const useAuth = () => {
  const dispatch = useAppDispatch();

  const userId = useAppSelector(selectedUserId);
  const conversationId = useAppSelector(selectedConversationId);

  const currentConversation = useAppSelector(getConversationById);

  const [generateToken, { data }] = useGenerateTokenMutation({});

  const currentUser = useAppSelector(getUserById);
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

  useEffect(() => {
    if (data?.jwt || jwtToken) {
      login(data?.jwt || jwtToken);
    }
  }, [data, jwtToken, login]);

  return { login, jwtToken, currentConversation, currentUser };
};

export default useAuth;
