// Person.jsx
import React, { useContext, useEffect } from 'react';
import VirtualList from 'rc-virtual-list';
import { Avatar, List, Tooltip, message } from 'antd';
import OptionBtn from '../Widgets.jsx/OptionBtn'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { UserContext } from '../Context/UserContext';

const ContainerHeight = 500;

const Person = ({ appendData, data }) => {
    const { setUser } = useContext(UserContext)

    const items = [
        {
            key: '1',
            label: 'Chat',
            icon: <EditOutlined />
        },
        {
            key: '2',
            label: 'Remove',
            icon: <DeleteOutlined />
        }
    ];

    useEffect(() => {
        appendData();
    }, [data]);

    const onScroll = (e) => {
        if (e.currentTarget.scrollHeight - e.currentTarget.scrollTop === ContainerHeight) {
            appendData();
        }
    };
   
    return (
        <List>
            <VirtualList
                data={data}
                height={ContainerHeight}
                itemHeight={47}
                itemKey="mail"
                onScroll={onScroll}
            >
                {(item) => (
                    <List.Item key={item.mail} onClick={() => setUser(item)}>
                        <List.Item.Meta
                            avatar={
                                <Tooltip title={item?.mail}>
                                    {item?.picture ? <Avatar src={item?.picture} /> :
                                        <Avatar style={{ backgroundColor: '#808080' }}>
                                            {item?.username.slice(0, 1)}
                                        </Avatar>
                                    }
                                </Tooltip>
                            }
                            title={<span>{item.username}</span>}
                        />
                        <OptionBtn color={"black"} items={items} />
                    </List.Item>
                )}
            </VirtualList>
        </List>
    );
};
export default Person;

// OptionBtn.jsx remains unchanged
