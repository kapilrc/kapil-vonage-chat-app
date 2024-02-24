'use client';
import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  Box,
  CircularProgress,
  IconButton,
  Stack,
  Typography,
  styled
} from '@mui/material';
import MuiTextField from '@mui/material/TextField';
import MuiCard from '@mui/material/Card';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { Conversation, NexmoApiError } from 'nexmo-client';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../redux/hooks';
import { getUserById, session } from '../redux/userSlice';
import { selectedConversation } from '../redux/chatRoomSlice';
import useAuth from '../hooks/useAuth';
import {
  getMessagesByConversationId,
  saveMessages
} from '../redux/messagesSlice';
import { uniqBy } from 'lodash';
import Navbar from '../components/NavBar';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';

const ConversationSection = styled(Box)(({ theme }) => ({
  height: 'calc(100vh - 146px)',
  padding: theme.spacing(3, 2),
  overflowY: 'scroll'
}));

const TypeMessageSection = styled(Box)(({ theme }) => ({
  border: '1px solid',
  padding: theme.spacing(2)
}));

const TextField = styled(MuiTextField)(({ theme }) => ({
  minWidth: '80%'
}));

const Card = styled(MuiCard)(({ theme }) => ({
  padding: theme.spacing(1),
  marginBottom: theme.spacing(2),
  background: theme.palette.grey[200],
  maxWidth: '70%',
  float: 'left',
  clear: 'both',
  '&.right': {
    float: 'right',
    background: theme.palette.primary.main,
    p: {
      color: '#fff'
    }
  }
}));

const ChatPage = () => {
  const dispatch = useDispatch();
  const [alert, setAlert] = useState('');

  const user = useAppSelector(getUserById);
  const appSession = useAppSelector(session);
  const { loading, jwtToken, logout } = useAuth();

  const [text, setText] = useState('');
  const getMessages = useAppSelector(getMessagesByConversationId);
  const [messages, setMessages] = useState(uniqBy(getMessages, 'key'));
  const [conversation, setConversation] = useState<Conversation>();
  const currentConversation = useAppSelector(selectedConversation);

  // messages
  useEffect(() => {
    console.log('messages', messages);
  }, [messages]);

  useEffect(() => {
    if (conversation) {
      conversation.on('text:typing:on', (data, e) => {
        if (conversation?.me?.id !== data?.memberId) {
          console.log(`${data.userName}is typing...`);
        }
      });
    }
  }, [conversation]);

  useEffect(() => {
    if (!user?.id || !currentConversation?.id) {
      return logout();
    }
    if (currentConversation?.id) {
      if (appSession) {
        appSession
          ?.getConversation(currentConversation?.id)
          .then((conversation) => {
            console.log(conversation);
            conversation.on('text', (sender, message) => {
              const { userId, userName } = sender;
              const {
                id,
                body: { text },
                timestamp
              } = message;
              const newMessages = {
                id,
                key: id,
                sender: userName,
                userId: userId,
                text,
                time: timestamp,
                conversationId: currentConversation?.id
              };

              setMessages((prev) => {
                let data = uniqBy([...prev, newMessages], 'key');
                dispatch(saveMessages(data));
                return data;
              });
            });
            conversation.join();
            setConversation(conversation);
          })
          .catch((err: NexmoApiError) => {
            console.log(err);
          });
      }
    }
  }, [user, currentConversation, appSession, jwtToken]);

  const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!text) return;

    conversation
      // ?.sendMessage({
      //   text,
      //   message_type: 'text'
      // })
      ?.sendText(text)
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
        <ConversationSection>
          {loading && (
            <Box textAlign="center">
              <CircularProgress />
            </Box>
          )}
          {messages.map((message) => {
            if (message?.userId === user?.id)
              return (
                <Card className="right" variant="outlined" key={message?.id}>
                  <Typography
                    sx={{ fontSize: 12 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    {message?.sender}
                  </Typography>
                  <Typography>{message?.text}</Typography>
                </Card>
              );
            return (
              <Card variant="outlined" key={message?.id}>
                <Typography
                  textAlign="right"
                  sx={{ fontSize: 12 }}
                  color="text.secondary"
                  gutterBottom
                >
                  {message.sender}
                </Typography>
                <Typography className="message other">
                  {message?.text}
                </Typography>
              </Card>
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
                value={text}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setText(e?.target?.value)
                }
                placeholder="Type a message..."
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
