import React, { useEffect, useState } from 'react';
import VirtualList from 'rc-virtual-list';
import { Avatar, List, message } from 'antd';
import OptionBtn from '../Widgets.jsx/OptionBtn'
import { DeleteOutlined, EditOutlined, CloseCircleOutlined } from '@ant-design/icons'

const fakeDataUrl ='https://randomuser.me/api/?results=20&inc=name,gender,email,nat,picture&noinfo';
const ContainerHeight = 830;

const Person = () => {
    const [data, setData] = useState([]);

    const items = [
        {
            key: '1',
            label: 'Edit',
            icon: <EditOutlined />
        },
        {
            key: '2',
            label: 'Block',
            icon: <CloseCircleOutlined />
        },
        {
            key: '4',
            label: 'Remove',
            icon: <DeleteOutlined />
        }
    ];

    const appendData = () => {
        fetch(fakeDataUrl)
            .then((res) => res.json())
            .then((body) => {
                setData(data.concat(body.results));
                message.success(`${body.results.length} more items loaded!`);
            });
    };

    useEffect(() => {
        appendData();
    }, []);
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
                itemKey="email"
                onScroll={onScroll}
            >
                {(item) => (
                    <List.Item key={item.email}>
                        <List.Item.Meta
                            avatar={<Avatar src={item.picture.large} />}
                            title={<a href="https://ant.design">{item.name.last}</a>}
                        />
                        <OptionBtn color={"black"} items={items} />
                    </List.Item>
                )}
            </VirtualList>
        </List>
    );
};
export default Person;