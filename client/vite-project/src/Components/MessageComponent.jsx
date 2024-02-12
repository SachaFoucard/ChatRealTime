import React, { useContext, useEffect, useState } from 'react';
import { Input, Button, List, Avatar, Space, message } from 'antd';
import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import { UserContext } from '../Context/UserContext';
import { ChatContext } from '../Context/ChatContext';

function MessagesComponent({ messages, chatId }) {
    const { me, user } = useContext(UserContext);
    const { socket, setMessages } = useContext(ChatContext)
    const [inputMessage, setInputMessage] = useState('');

    const [favorites, setFavorites] = useState([]);

    const sendMessage = async () => {
        try {
            if (!inputMessage.trim()) {
                return; // If input message is empty, do nothing
            }
    
            // Send message via WebSocket
            socket.emit("join_room", chatId);
            socket.emit('send_message', { message: inputMessage, room: chatId });
    
            // Send message via HTTP request to save it in the database
            const response = await fetch('http://localhost:3000/api/message', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    chatId,
                    senderId: me._id,
                    text: inputMessage
                })
            });
    
            const responseData = await response.json();
    
            // Update the messages state with the newly saved message
            setMessages(prevMessages => [...prevMessages, responseData]);
            setInputMessage('');
        } catch (error) {
            console.error(error);
            message.error('Failed to send message');
        }
    };


    const toggleFavorite = (messageId) => {
        if (favorites.includes(messageId)) {
            setFavorites(favorites.filter(id => id !== messageId));
        } else {
            setFavorites([...favorites, messageId]);
        }
    };
   

    return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <div style={{ flex: 1, overflowY: 'auto' }}>
                <List
                    itemLayout="horizontal"
                    dataSource={messages}
                    renderItem={(message) => {
                        const fromMe = message?.senderId === me._id;
                        const profilPic = fromMe ? me?.picture : user.picture;

                        return (
                            <List.Item style={{ alignContent: fromMe ? 'right' : 'left' }}>
                                <List.Item.Meta
                                    avatar={<Avatar src={profilPic} shape="square" />}
                                    title={
                                        <span style={{ display: 'flex', alignItems: 'center' }}>
                                            {!fromMe ? <span style={{ marginRight: '5px', fontSize: '0.8em' }}>{user.username} </span> : <span style={{ marginRight: '5px', fontSize: '0.8em' }}>{me?.username} </span>}
                                            <span style={{ fontSize: '0.8em', color: '#888', marginLeft: '10px' }}>{message.timestamp}</span>
                                        </span>
                                    }
                                    description={
                                        <Space>
                                            <div style={{ color: 'black' }}>
                                                {message.text}
                                            </div>
                                            {favorites.includes(message.id) ? (
                                                <HeartFilled style={{ color: 'yellow', marginLeft: '5px' }} onClick={() => toggleFavorite(message.id)} />
                                            ) : (
                                                <HeartOutlined style={{ marginLeft: '5px' }} onClick={() => toggleFavorite(message.id)} />
                                            )}
                                        </Space>
                                    }
                                />
                            </List.Item>
                        );
                    }}
                />
            </div>
            <div style={{ padding: '10px' }}>
                <Input placeholder="Type your message..." onChange={(e) => setInputMessage(e.target.value)} />
                <Button onClick={() => sendMessage()} type="primary" style={{ marginTop: '10px' }}>Send</Button>
            </div>
        </div>
    );
}

export default MessagesComponent;
