import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Avatar, Divider, List, Skeleton } from 'antd';
import { useContext } from 'react';
import { UserContext } from '../Context/UserContext';

const FavoritesMess = () => {
    const { setUser } = useContext(UserContext);

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);

    const loadMoreData = async () => {
        if (loading) {
            return;
        }
        setLoading(true);
        fetch('https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo')
            .then((res) => res.json())
            .then((body) => {
                setData(body.results);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        loadMoreData();
    }, []);

    return (
        <>
            <h4 className='title-fav'>Favorites</h4>
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
                            <List.Item key={item.email} onClick={() => setUser(item)}>
                                <List.Item.Meta
                                    avatar={<Avatar src={item.picture.large} />}
                                    title={item.name.last}
                                    description={item.email}
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
