import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Avatar, Divider, List, Skeleton } from 'antd';
import { useContext } from 'react';
import { UserContext } from '../Context/UserContext';
import { PlusSquareTwoTone } from '@ant-design/icons'

const FavoritesMess = () => {
    const { setUser, me } = useContext(UserContext);

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);

    const loadMoreData = async () => {
        if (loading) {
            return;
        }
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:3000/api/favoritesContacts/${me?._id}`);
            const body = await response.json();
            setData(body.ArrayUsers);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        loadMoreData();
    }, [data]);

    return (
        <>
            <div className='Header-add-discussion'>
                <h6 className='title-Mess'>Favorites Message</h6>
                <PlusSquareTwoTone style={{ fontSize: 30, border: 10, borderColor: 'green' }} />
            </div>
            <div
                id="scrollableDiv"
                style={{
                    height: 250,
                    overflow: 'auto',
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
                            <List.Item key={item.mail} onClick={() => setUser(item)}>
                                <List.Item.Meta
                                    avatar={item?.picture ? <Avatar src={item?.picture} /> : <Avatar
                                        style={{
                                            backgroundColor: '#f56a00',
                                        }}
                                    >
                                        {item?.username.slice(0,1)}
                                    </Avatar>}
                                    title={item.username}
                                    description={item.mail}
                                />
                            </List.Item>
                        )}
                    />
                </InfiniteScroll>
            </div>
        </>
    );
};

export default FavoritesMess;
