import React, { useContext, useState, useEffect } from 'react';
import { Input} from 'antd';
import { UserContext } from '../Context/UserContext';
import MessagesComponent from './MessageComponent'

const { TextArea } = Input;

const ChatBox = () => {
    const { user, me } = useContext(UserContext);
    const [inputMessage, setInputMessage] = useState('');
    const [chatId, setChatId] = useState(null);
    const [messages, setMessages] = useState([]);


    useEffect(() => {
        getMessages();
    }, [user]);

    const getMessages = async () => {
        try {
            console.log('me?._id', me?._id);
            console.log('user?._id', user?._id);

            const response = await fetch(`http://localhost:8000/api/getChatAndMessages/${me?._id}/${user?._id}`);
            const responseData = await response.json();
            setMessages(responseData.messages.map(msg => ({
                id: msg._id,
                text: msg.text,
                timestamp: new Date(msg.createdAt).toLocaleTimeString(),
                senderId: msg.senderId,
            })));
            setChatId(responseData?.messages[0]?.chatId);
        } catch (error) {
            setMessages([]);
        }
    };
   

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '85vh', marginInline: 20 }}>
            <div style={{ flex: 1, overflowY: 'scroll' }}>
                <MessagesComponent messages={messages} user={user} />
            </div>
        </div>
    );
};


export default ChatBox;
