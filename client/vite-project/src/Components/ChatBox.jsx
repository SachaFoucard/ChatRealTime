import React, { useContext, useState, useEffect } from 'react';
import { Input, message, Button } from 'antd';
import { UserContext } from '../Context/UserContext';
import MessagesComponent from './MessageComponent';
import { ChatContext } from '../Context/ChatContext';

const { TextArea } = Input;

const ChatBox = () => {
    const { user, me } = useContext(UserContext);
    const { messages, setMessages, socket } = useContext(ChatContext);
    const [chatId, setChatId] = useState(null);

    const getMessages = async () => {
        try {
            if (user) {
                const response = await fetch(`http://localhost:3000/api/getChatAndMessages/${me?._id}/${user?._id}`);
                const responseData = await response.json();
                setMessages(responseData.messages.map(msg => ({
                    id: msg._id,
                    text: msg.text,
                    timestamp: new Date(msg.createdAt).toLocaleTimeString(),
                    senderId: msg.senderId,
                })));
                setChatId(responseData.messages[0]?.chatId || responseData.chatId);
            } else {
                message.error('User is undefined');
            }
        } catch (error) {
            console.error(error);
            setMessages([]);
        }
    };

    useEffect(() => {
        getMessages();
    }, [user, chatId,messages]);

    useEffect(() => {
        if (socket) {
            socket.on('receive_message', (data) => {
                setMessages(prevMessages => [...prevMessages, data.message]);
            });
        }
    }, [socket]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '85vh', marginInline: 20 }}>
            <div style={{ flex: 1, overflowY: 'scroll' }}>
                <MessagesComponent messages={messages} chatId={chatId} />
            </div>
        </div>
    );
};

export default ChatBox;
