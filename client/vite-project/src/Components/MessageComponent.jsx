import React, { useContext, useState } from 'react';
import { Input, Button, List, Avatar, Space } from 'antd';
import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import { UserContext } from '../Context/UserContext';

function MessagesComponent({ messages, user }) {
    const { me } = useContext(UserContext);
    const [favorites, setFavorites] = useState([]);

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
                            <List.Item style={{alignContent : fromMe ? 'right' : 'left'}}>
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
                <Input placeholder="Type your message..." />
                <Button type="primary" style={{ marginTop: '10px' }}>Send</Button>
            </div>
        </div>
    );
}

export default MessagesComponent;
