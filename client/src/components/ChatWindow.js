import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import Typography from '@mui/material/Typography';
import SendIcon from '@material-ui/icons/Send';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Card from '@mui/material/Card';
import InputLabel from '@mui/material/InputLabel';
import { useEffect, useState } from 'react';
import {useOutletContext} from 'react-router-dom';
export default function ChatWindow(){
    const {socket}=useOutletContext();
    const[message,setMessage]=useState('');
    const[chat,setChat]=useState([]);
    const[typing,setTyping]=useState(false);

   
    
      useEffect(()=>{
        if(!socket) return;
        socket.on('message-from-server',(data)=>{
          // console.log('message received',data);
          setChat((prev)=>[...prev,{message:data.message,received:true}]);
        })
        socket.on('typing-started-from-server',()=>setTyping(true));
        socket.on('typing-stopped-from-server',()=>setTyping(false));
      },[socket])
    
      function handleForm(e){
        e.preventDefault();
        // console.log(message);
        socket.emit('send-message',{message});
        setChat((prev)=>[...prev,{message,received:false}]);
        setMessage('');
      }
      const[typingTimeout,setTypingTimeout]=useState(null);
      const handleInput=(e)=>{
        setMessage(e.target.value);
        socket.emit('typing-started');

        if(typingTimeout) clearTimeout(typingTimeout);

        setTypingTimeout(
            setTimeout(()=>{
            socket.emit('typing-stopped');
        },1000)
        );
      }
    return(
        
        <Card sx={{padding:2,marginTop:10,width:'60%',backgroundColor:'gray'}}>
        <Box sx={{marginBottom:5}}>
        {
          chat.map((data)=>(
            <Typography sx={{textAlign:data.received?'left':'right'}} key={data.message}>{data.message}</Typography>
          ))}
        </Box>
      <Box component='form' onSubmit={handleForm}>
        {
            typing && (<InputLabel sx={{color:'white'}} shrink htmlFor="message-input">
            Typing...
          </InputLabel>
          )}
      
         {/* <TextField  size='small' label="Write your message" varient="standard" value={message} onChange={(e)=>setMessage(e.target.value)} /> */}
         <OutlinedInput
         sx={{backgroundColor:'white'}}
         label="Write your message"
         size="small"
         fullWidth
            id="message-input"
            value={message}
            placeholder="Write your message"
            onChange={handleInput}
            endAdornment={
              <InputAdornment position="end">
                <IconButton type="submit"edge="end">
                  <SendIcon></SendIcon>
                </IconButton>
              </InputAdornment>
            }
          />
      </Box>
      </Card>
    )
}