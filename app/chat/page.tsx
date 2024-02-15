'use client';
import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  Box,
  IconButton,
  Stack,
  Typography,
  styled
} from '@mui/material';
import MuiTextField from '@mui/material/TextField';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { Conversation } from 'nexmo-client';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../redux/hooks';
import { getUserById, session } from '../redux/userSlice';
import { selectedConversation } from '../redux/chatRoomSlice';
import useAuth from '../hooks/useAuth';
import {
  getMessagesByConversationId,
  saveMessages
} from '../redux/messagesSlice';
import uniqBy from 'lodash';
import Navbar from '../components/NavBar';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';

const ConversationSection = styled(Box)(({ theme }) => ({
  minHeight: 'calc(100vh - 146px)',
  padding: theme.spacing(3, 2)
}));

const TypeMessageSection = styled(Box)(({ theme }) => ({
  border: '1px solid',
  padding: theme.spacing(2)
}));

const TextField = styled(MuiTextField)(({ theme }) => ({
  minWidth: '80%'
}));

const ChatPage = () => {
  const dispatch = useDispatch();
  const [alert, setAlert] = useState('');

  const user = useAppSelector(getUserById);
  const appSession = useAppSelector(session);
  const { jwtToken, logout } = useAuth();

  const [text, setText] = useState('');
  const getMessages = useAppSelector(getMessagesByConversationId);
  const [messages, setMessages] = useState(uniqBy(getMessages, 'key'));

  const chatBoxRef = useRef<HTMLDivElement>();
  const inputRef = useRef<HTMLInputElement>();
  let typing = useRef('');
  const [conversation, setConversation] = useState<Conversation>();
  const currentConversation = useAppSelector(selectedConversation);

  const onMessage = (sender, message) => {
    const { userName, userId } = sender;
    const { id, body, time } = message;
    const newMessages = {
      id,
      key: id,
      sender: userName,
      userId,
      text: body.text,
      time,
      conversationId: currentConversation?.id
    };

    setMessages((prev) => {
      let data = uniqBy([...prev, newMessages], 'key');
      dispatch(saveMessages(data));
      return data;
    });

    chatBoxRef.current.scrollTo({
      top: 100000,
      behavior: 'auto'
    });
  };

  useEffect(() => {
    if (conversation) {
      inputRef?.current?.addEventListener('keypress', (e) => {
        conversation?.startTyping();
      });

      inputRef?.current?.addEventListener('keyup', (e) => {
        conversation?.stopTyping();
      });

      conversation.on('text:typing:on', (data, e) => {
        if (conversation?.me?.id !== data?.memberId) {
          typing.current = data?.userName;
        }
      });
      conversation.on('text:typing:off', (data) => {
        typing.current = '';
      });
    }
  }, [conversation]);

  useEffect(() => {
    if (!user?.id || !currentConversation?.id) {
      return logout();
    }
    if (currentConversation?.id) {
      if (appSession) {
        appSession?.getConversation(currentConversation?.id).then((c) => {
          const newMessages = {
            id: 'ssd',
            key: 'id',
            sender: 'userName',
            userId: 1,
            text: 'sdfsfsdf',
            time: 'sdfsf',
            conversationId: currentConversation?.id
          };

          setMessages((prev) => {
            let data = uniqBy([...prev, newMessages], 'key');
            dispatch(saveMessages(data));
            return data;
          });
          setConversation(c);
        });
      }
    }
  }, [user, currentConversation, appSession, jwtToken]);

  const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!text) return;

    conversation
      ?.sendMessage({
        text,
        message_type: 'text'
      })
      .then((event) => {
        console.log('message was sent', event);
        setConversation(event?.conversation);
        setText('');
      })
      .catch((err) => {
        setAlert('some error occurred');
        console.log(err);
      });
  };

  const onLogout = () => {
    setConversation(null);
    logout();
  };

  return (
    <>
      <Navbar>
        <Stack direction="row" spacing={2}>
          <Typography>Name: {user?.name}</Typography>
          <Typography>Room: {currentConversation?.name}</Typography>
        </Stack>
        <Box sx={{ flexGrow: 1 }} />
        <IconButton onClick={onLogout}>
          {/* color="primary" */}
          <LogoutRoundedIcon sx={{ color: '#fff' }} />
        </IconButton>
      </Navbar>
      <Stack justifyContent="space-between" mt={7}>
        <ConversationSection ref={chatBoxRef}>
          <Typography>Hello</Typography>
          {messages.map((message) => {
            if (message?.userId === user?.id)
              return <div key={message?.id}>{message?.text}</div>;
            return (
              <div key={message?.id}>
                <div>{message.sender}</div>
                <div className="message other">{message?.text}</div>
              </div>
            );
          })}
          {alert && <Alert severity="error">This is an error Alert.</Alert>}
        </ConversationSection>

        {/* Type message container */}
        <TypeMessageSection>
          <form onSubmit={sendMessage}>
            <Stack
              spacing={3}
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <TextField
                type="text"
                ref={inputRef}
                value={text}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setText(e?.target?.value)
                }
                placeholder="Enter the message..."
              />
              <IconButton type="submit">
                <SendRoundedIcon />
              </IconButton>
            </Stack>
          </form>
        </TypeMessageSection>
      </Stack>
    </>
  );
};

export default ChatPage;
