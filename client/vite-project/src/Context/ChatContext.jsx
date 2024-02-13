import { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import { UserContext } from './UserContext';

export const ChatContext = createContext();

export default function ChatContextProvider({ children }) {
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [socket, setSocket] = useState(null);
    const { me } = useContext(UserContext);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const newSocket = io.connect('http://localhost:3000');

        newSocket.on('connect', () => {
            console.log('Socket connected with ID:', newSocket.id);
            setSocket(newSocket)
        });
      
        newSocket.on('receive_message', (data) => {
            setMessages(prevMessages => [...prevMessages, data]);
        });

        // Clean up function to close the socket connection and remove event listeners
        return () => {
            newSocket.close();
        };
    }, [me]);

    const value = {
        socket,
        messages,
        setMessages,
        onlineUsers
    };

    return (
        <ChatContext.Provider value={value}>
            {children}
        </ChatContext.Provider>
    );
}
