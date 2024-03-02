'use client';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks';
import { getUserById, session } from '@/src/redux/userSlice';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Card from '@mui/material/Card';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import { Divider, Stack, styled } from '@mui/material';
import useAuth from '../../hooks/useAuth';
import moment from 'moment';
import {
  MessageProps,
  getMessagesByConversationId,
  inputText,
  saveMessages
} from '../../redux/messagesSlice';
import { uniqBy } from 'lodash';
// import { NexmoApiError } from 'nexmo-client';
import {
  chatConversation,
  selectedConversation,
  setConversation
} from '../../redux/chatRoomSlice';
import { Application, Conversation } from 'nexmo-client';
import { Translate } from '@mui/icons-material';
import ChatMessage from './ChatMessage';

const Wrapper = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  overflowY: 'auto',
  flexGrow: 1
}));

const Loader = styled(Box)(({ theme }) => ({
  position: 'absolute',
  left: '50%',
  transform: 'translateX(-50%)'
}));

const ChatWrapper = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  maxWidth: '70%',
  float: 'left',
  clear: 'both',
  '.MuiPaper-root': {
    padding: theme.spacing(0.5, 2),
    background: `${theme.palette.primary.main}22`,
    borderRadius: 20
  },
  '&.right': {
    float: 'right',
    '.MuiPaper-root': {
      background: theme.palette.primary.main,
      color: theme.palette.common.white
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
              const newMessages: MessageProps = {
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
        <Loader textAlign="center" position="absolute">
          <CircularProgress />
        </Loader>
      )}
      <Divider textAlign="left">
        <Chip label={moment().format('D MMMM YYYY')} />
      </Divider>
      {messages.map((message) => {
        if (message?.userId === user?.id)
          return (
            <ChatMessage key={message?.id} content="right" message={message} />
          );
        return <ChatMessage key={message?.id} message={message} />;
      })}
      {/* {alert && <Alert severity="error">This is an error Alert.</Alert>} */}
    </Wrapper>
  );
};

export default ConversationSection;
