'use client';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/app/redux/hooks';
import { getUserById, session } from '@/app/redux/userSlice';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import MuiCard from '@mui/material/Card';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material';
import useAuth from '../hooks/useAuth';
import {
  getMessagesByConversationId,
  inputText,
  saveMessages
} from '../redux/messagesSlice';
import { uniqBy } from 'lodash';
// import { NexmoApiError } from 'nexmo-client';
import {
  chatConversation,
  selectedConversation,
  setConversation
} from '../redux/chatRoomSlice';
import { Application, Conversation } from 'nexmo-client';

const Wrapper = styled(Box)(({ theme }) => ({
  height: 'calc(100vh - 146px)',
  padding: theme.spacing(3, 2),
  overflowY: 'scroll'
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

const ConversationSection = () => {
  const dispatch = useAppDispatch();
  const [alert, setAlert] = useState('');
  const user = useAppSelector(getUserById);
  const appSession: Application = useAppSelector(session);
  const { loading, jwtToken, logout } = useAuth();
  const sentMessage = useAppSelector(inputText);
  const getMessages = useAppSelector(getMessagesByConversationId);
  const [messages, setMessages] = useState(uniqBy(getMessages, 'key'));
  const conversation: Conversation = useAppSelector(chatConversation);
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
            dispatch(setConversation(conversation));
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }, [user, currentConversation, appSession, jwtToken]);

  useEffect(() => {
    conversation
      // ?.sendMessage({
      //   text,
      //   message_type: 'text'
      // })
      ?.sendText(sentMessage)
      .then((event) => {
        console.log('message was sent', event);
        dispatch(setConversation(event?.conversation));
        // setConversation(event?.conversation);
      })
      .catch((err) => {
        setAlert('some error occurred');
        console.log(err);
      });
  }, [sentMessage]);

  return (
    <Wrapper>
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
            <Typography className="message other">{message?.text}</Typography>
          </Card>
        );
      })}
      {/* {alert && <Alert severity="error">This is an error Alert.</Alert>} */}
    </Wrapper>
  );
};

export default ConversationSection;
