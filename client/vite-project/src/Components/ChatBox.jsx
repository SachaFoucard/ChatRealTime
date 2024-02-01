import React, { useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Input, Button, List, Avatar, Space } from 'antd';
import { UserContext } from '../Context/UserContext';

const { TextArea } = Input;

const ChatBox = () => {
    const { user } = useContext(UserContext);
    const [inputMessage, setInputMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        getMessages();
    }, []);

    const getMessages = async () => {
        try {
            const response = await fetch('http://localhost:8000/api/getMessages/65bb7f1112adb18f4cf2d69f');
            setMessages(response.data.map(msg => ({
                id: msg._id,
                text: msg.text,
                timestamp: new Date(msg.createdAt).toLocaleTimeString(),
                senderId: msg.senderId,
            })));
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    }

    const handleSendMessage = () => {
        if (inputMessage.trim() !== '') {
            const newMessage = {
                id: uuidv4(),
                text: inputMessage,
                timestamp: new Date().toLocaleTimeString(),
            };
            setMessages([...messages, newMessage]);
            setInputMessage('');
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '85vh' }}>
            <div style={{ flex: 1, overflowY: 'scroll' }}>
                <List
                    itemLayout="horizontal"
                    dataSource={messages}
                    renderItem={(message) => (
                        <List.Item style={{ textAlign: user._id === message.senderId ? 'right' : 'left' }}>
                            <List.Item.Meta
                                avatar={<Avatar src={user._id === message.senderId ? user.picture.large : null} />}
                                title={message.timestamp}
                                description={message.text}
                            />
                        </List.Item>
                    )}
                />
            </div>
            <div className='bar-send'>
                <Space>
                    <TextArea
                        rows={2}
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        placeholder="Type your message..."
                    />
                </Space>
                <Button type="primary" onClick={handleSendMessage}>
                    Send
                </Button>
            </div>
        </div>
    );
};

export default ChatBox;
