import express from 'express';
import http from 'http';
import {Server} from 'socket.io';
const app=express();
const PORT=4000;
const httpServer=http.createServer(app);
const io=new Server(httpServer,{
    cors:{
        origin:['http://localhost:3000']
    }
});
import path from 'path';
import { fileURLToPath } from 'url';
const __filename=fileURLToPath(import.meta.url);
const __dirname=path.dirname(__filename);


app.get('/',(req,res)=>{
    // res.json({data:'hello world from socket'});
    res.sendFile(__dirname + '/index.html');
})

io.on('connection',(socket)=>{
    // console.log('Connection is ready');
    socket.on('send-message',(data)=>{
        socket.broadcast.emit('message-from-server',data);
        console.log('message received',data);
    })
    socket.on('typing-started',()=>{
        socket.broadcast.emit('typing-started-from-server');
    })
    
    socket.on('typing-stopped',()=>{
        socket.broadcast.emit('typing-stopped-from-server');
    })
    socket.on('join-room',(roomId)=>{
        console.log('Joining room');
        socket.join(roomId);
    })

    socket.on('disconnect',(socket)=>{
        console.log('User Left');
        
    })
})



httpServer.listen(PORT,()=>{
console.log('Serving is running at http://localhost/4000');
})