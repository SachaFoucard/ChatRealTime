import React, { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import { message } from 'antd';
import { UserContext } from './UserContext';

export const ChatContext = createContext();

export default function ChatContextProvider({ children }) {
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [socket, setSocket] = useState(null);
    const { me } = useContext(UserContext);

    useEffect(() => {
        const newSocket = io("http://localhost:5173");

        newSocket.on('connect', () => {
            message.success('Connected to the server');
        });

        setSocket(newSocket);

        return () => { newSocket.disconnect(); };
    }, []);

    useEffect(() => {
        const storedUserData = sessionStorage.getItem('userData');
        const initialUserData = storedUserData ? JSON.parse(storedUserData) : null;

        if (!socket) return;

        socket.emit('AddNewUser', initialUserData?._id);

        socket.on('GetOnlineUsers', (res) => {
            // Filter out the current user
            setOnlineUsers(res);
        });

        return () => {
            socket.off('GetOnlineUsers'); // Cleanup event listener
        };
    }, [socket]);

    useEffect(() => {
        console.log('onlineUsers', onlineUsers);
    }, [onlineUsers]);

    const value = {
        onlineUsers,
        socket
    };

    return (
        <ChatContext.Provider value={value}>
            {children}
        </ChatContext.Provider>
    );
}
