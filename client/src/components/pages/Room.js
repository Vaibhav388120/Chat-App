import { useEffect } from "react"
import {useParams} from 'react-router-dom';
import {useOutletContext} from 'react-router-dom';
export default function Room(){
    const params=useParams();
    const {socket} =useOutletContext();
    useEffect(()=>{
        socket.emit('join-room',{roomId:params.roomId});
        console.log(params);
    },[socket]);
    return(
        <div>Room</div>
    )
}