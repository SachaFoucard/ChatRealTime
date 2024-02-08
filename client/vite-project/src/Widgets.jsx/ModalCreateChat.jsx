import React, { useContext, useState, useEffect } from 'react';
import { Modal, message, Input, List, Avatar, Button } from 'antd';
import { UserContext } from '../Context/UserContext';

const { Search } = Input;

const ModalCreateChat = ({ isVisible, setIsVisible }) => {
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [contacts, setContacts] = useState([]);
    const { me } = useContext(UserContext);

    useEffect(() => {
        GetContacts();
    }, []);

    const GetContacts = async () => {
        if (!me?._id || loading) {
            return;
        }
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:8000/api/getContacts/${me?._id}`);
            const data = await response.json();
            if (data) {
                setContacts(data.Allcontacts);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const CreateChat = async (item) => {
        try {
            const response = await fetch('http://localhost:8000/api/createChat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstId: me?._id,
                    secondId: item?._id
                })
            });
            if (response.status === 200) {
                message.error('Chat already exists');
            } else if (response.status === 201) {
                message.success('Chat opened!');
                // Update state or perform any additional action upon successful chat creation
            }
        } catch (error) {
            console.error('Error creating chat:', error);
        }
    };

    const hideModal = () => {
        setIsVisible(false);
    };

    const onSearch = async () => {
        // Search logic here...
    };
    

    return (
        <Modal
            title="Create"
            open={isVisible}
            onCancel={hideModal}
            footer={null}
        >
            <Search onChange={(e) => setInput(e.target.value)} placeholder="Enter email address" onSearch={onSearch} loading={loading} />
            <List
                itemLayout="horizontal"
                dataSource={contacts}
                loading={loading}
                renderItem={item => (
                    <List.Item
                        actions={[
                            <Button key="open-chat" onClick={() => CreateChat(item)}>Open Chat</Button>
                        ]}
                    >
                        <List.Item.Meta
                            avatar={
                                item.picture ? (
                                    <Avatar src={item?.picture} />
                                ) : (
                                    <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />
                                )
                            }
                            title={item.username}
                        />
                    </List.Item>
                )}
            />
        </Modal>
    );
};

export default ModalCreateChat;
