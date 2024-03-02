import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material';
import moment from 'moment';
import { MessageProps } from '@/src/redux/messagesSlice';

type Props = {
  key: string;
  content?: string;
  message: MessageProps;
};

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

const ChatMessage = ({ key, content, message }: Props) => {
  return (
    <ChatWrapper
      className={content === 'right' ? 'right' : ''}
      key={message.id}
    >
      <Typography
        sx={{ fontSize: 12 }}
        textAlign={content === 'right' ? 'right' : 'left'}
        color="text.secondary"
        gutterBottom
      >
        {message.sender}
      </Typography>
      <Stack
        direction={content === 'right' ? 'row' : 'row-reverse'}
        alignItems="center"
        spacing={1}
      >
        <Typography variant="caption">
          {moment(message.time).format('HH:mm')}
        </Typography>
        <Card variant="outlined">
          <Typography>{message.text}</Typography>
        </Card>
      </Stack>
    </ChatWrapper>
  );
};

export default ChatMessage;
