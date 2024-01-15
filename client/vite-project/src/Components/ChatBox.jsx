import React, { useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Input, Button, List, Avatar, Space } from 'antd';
import { UserContext } from '../Context/UserContext';
import { calc } from 'antd/es/theme/internal';

const { TextArea } = Input;

const ChatBox = () => {
    const { user } = useContext(UserContext)
    const [inputMessage, setInputMessage] = useState('');
    const [messages, setMessages] = useState([]);

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
                        <List.Item>
                            <List.Item.Meta
                                avatar={<Avatar src={user?.picture?.large} />}
                                title={message.timestamp}
                                description={message.text}
                            />
                        </List.Item>
                    )}
                />
            </div>
            <div className='bar-send'>
                <Space>
                    <TextArea style={{width:'100vh'}}
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
