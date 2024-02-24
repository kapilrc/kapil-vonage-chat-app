// import React, { useRef, useState } from 'react';
// import { Box, IconButton, Stack, styled } from '@mui/material';
// import MuiTextField from '@mui/material/TextField';

// import SendRoundedIcon from '@mui/icons-material/SendRounded';
// import { Conversation } from 'nexmo-client';
// import { useDispatch } from 'react-redux';

// const Wrapper = styled(Box)(({ theme }) => ({
//   border: '1px solid',
//   padding: theme.spacing(2)
// }));

// const TextField = styled(MuiTextField)(({ theme }) => ({
//   minWidth: '80%'
// }));

// const TypeMessageSection = () => {
//   return (
//     <Wrapper>
//       <form onSubmit={sendMessage}>
//         <Stack
//           spacing={3}
//           direction="row"
//           justifyContent="center"
//           alignItems="center"
//         >
//           <TextField
//             type="text"
//             ref={inputRef}
//             value={text}
//             onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
//               setText(e?.target?.value)
//             }
//             placeholder="Enter the message..."
//           />
//           <IconButton type="submit">
//             <SendRoundedIcon />
//           </IconButton>
//         </Stack>
//       </form>
//     </Wrapper>
//   );
// };

// export default TypeMessageSection;
