import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Avatar, Divider, List, Skeleton } from 'antd';
import { PlusSquareTwoTone } from '@ant-design/icons'
import { useContext } from 'react';
import { UserContext } from '../Context/UserContext';
import ModalCreateChat from '../Widgets.jsx/ModalCreateChat';

const DirectMessage = ({GetChat,contactsOpenChat,hasMoreData}) => {
    const { setUser,me } = useContext(UserContext);
    const [isModalVisible, setIsModalVisible] = useState(false); // State to control modal visibility

    const handleSquareIconClick = () => {
        setIsModalVisible(true); // Show the modal when the square icon is clicked
    };

    useEffect(() => {
        
    }, [contactsOpenChat]);

    {console.log(contactsOpenChat);}

    return (
        <>
            <div className='Header-add-discussion'>
                <h6 className='title-Mess'>Chat</h6>
                <PlusSquareTwoTone onClick={handleSquareIconClick} style={{ fontSize: 30, border: 10, borderColor: 'green' }} />
            </div>
            <div
                id="scrollableDiv"
                style={{
                    height: 250,
                    overflowY: 'auto',
                    padding: '0 16px',
                    borderBottom: '1px solid rgba(140, 140, 140, 0.35)',
                }}
            >
                <InfiniteScroll
                    dataLength={contactsOpenChat}
                    next={GetChat}
                    hasMore={hasMoreData} // Use state variable to determine if there's more data
                    loader={
                        <Skeleton
                            avatar
                            paragraph={{
                                rows: 1,
                            }}
                            active
                        />
                    }
                    endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
                    scrollableTarget="scrollableDiv"
                >
                    <List
                        dataSource={contactsOpenChat}
                        renderItem={(item) => (
                            <List.Item key={item.mail} onClick={() => setUser(item)}>
                                <List.Item.Meta
                                    avatar={item?.picture ? <Avatar src={item?.picture} /> : <Avatar
                                        style={{
                                            backgroundColor: '#808080',
                                        }}
                                    >
                                        {item?.username.slice(0, 1)}
                                    </Avatar>}
                                    title={item.username}
                                    description={item.mail}
                                />
                            </List.Item>
                        )}
                    />
                </InfiniteScroll>
            </div>
            <ModalCreateChat isVisible={isModalVisible} setIsVisible={setIsModalVisible} />
        </>
    );
};
export default DirectMessage;
