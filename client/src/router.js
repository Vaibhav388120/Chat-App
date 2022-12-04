import {createBrowserRouter,} from 'react-router-dom';
import App from './App';
import ChatWindow from './components/ChatWindow';
import Home from './components/pages/Home';
import Chats from './components/pages/Chats';
import Room from './components/pages/Room';
const router=createBrowserRouter([
    {
        path:'/',
        element:<App/>,
        children:[
            {
                path:'/',
                element:<Home/>
            },
            {
            path:'/chats',
            element:<Chats/>
            },
            {
            path:'/room/:roomId',
            element:<Room/>
            },
        ]
    },
]);

export default router;