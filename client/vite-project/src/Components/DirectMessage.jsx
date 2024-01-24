import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Avatar, Divider, List, Skeleton } from 'antd';
import { PlusSquareTwoTone } from '@ant-design/icons'
import { useContext } from 'react';
import { UserContext } from '../Context/UserContext';
import ModalAddContact from '../Widgets.jsx/ModalAddContact';

const Boxmessage = () => {
    const { setUser } = useContext(UserContext)
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false); // State to control modal visibility

    const loadMoreData = () => {
        if (loading) {
            return;
        }
        setLoading(true);
        fetch('https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo')
            .then((res) => res.json())
            .then((body) => {
                setData([...data, ...body.results]);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    const handleSquareIconClick = () => {
        setIsModalVisible(true); // Show the modal when the square icon is clicked
    };

    useEffect(() => {
        loadMoreData();
    }, []);

    return (
        <>
            <div className='Header-add-discussion'>
                <h6 className='title-Mess'>Direct Message</h6>
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
                    dataLength={data.length}
                    next={loadMoreData}
                    hasMore={data.length < 50}
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
                        dataSource={data}
                        renderItem={(item) => (
                            <List.Item key={item.email} onClick={() => setUser(item)}>
                                <List.Item.Meta
                                    avatar={<Avatar src={item.picture.large} />}
                                    title={item.name.last}
                                    description={<p>Hey ! What's up bro ?</p>}
                                />
                            </List.Item>
                        )}
                    />
                </InfiniteScroll>
            </div>
            <ModalAddContact isVisible={isModalVisible} setIsVisible={setIsModalVisible} />
        </>
    );
};
export default Boxmessage;