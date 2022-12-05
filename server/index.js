import express from 'express';
import http from 'http';
import {Server} from 'socket.io';
import sockets from './socket/sockets.js';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import router from './api/routes.js';
import cors from 'cors';

await mongoose.connect('mongodb+srv://vaibhav:vaibhav123@cluster0.u2rkpus.mongodb.net/?retryWrites=true&w=majority');

const app=express();
const PORT=4000;

const httpServer=http.createServer(app);
const io=new Server(httpServer,{
    cors:{
        origin:['http://localhost:3000']
    }
});


const __filename=fileURLToPath(import.meta.url);
const __dirname=path.dirname(__filename);

app.use(cors());
app.get('/',(req,res)=>{
    res.sendFile(__dirname+ '/index.html');
})
app.use('/',router);
io.on('connection',sockets);
httpServer.listen(PORT,()=>{
console.log('Serving is running at http://localhost/4000');
})