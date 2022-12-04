import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import SendIcon from '@material-ui/icons/Send';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import {io} from 'socket.io-client';
import { useEffect, useState } from 'react';
import ChatWindow from './components/ChatWindow';
function App() {


  return (
    <div>
      <Container>
       <ChatWindow/>
      </Container>
    </div>
  );
}

export default App;
