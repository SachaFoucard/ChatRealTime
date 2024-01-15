import React, { useContext,useState } from 'react';
import { MessageFilled, HeartOutlined, PhoneFilled, VideoCameraOutlined, EllipsisOutlined,HeartFilled } from '@ant-design/icons';
import { UserContext } from '../Context/UserContext';
import Call from '../Widgets.jsx/Nav/Call'
import Video from '../Widgets.jsx/Nav/Video'

const ListIcon = () => {
    const { user } = useContext(UserContext);
    const [isHeartFilled, setIsHeartFilled] = useState(false);
    const listStyle = {
        display: 'flex',
        justifyContent: 'center',
        listStyle: 'none',
        padding: 0,
    };

    const listItemStyle = {
        marginRight: '10px',
    };

    const iconStyle = {
        fontSize: '15px',
        padding: '10px',
        borderRadius: '5px',
        cursor:'pointer'
    };

    const ToogleHeartClick = () => {
        setIsHeartFilled(!isHeartFilled);
        // add the userID of the user to my Fav array [id,id,id] 
    };

    return (
        <ul style={listStyle}>
            <li style={{ ...listItemStyle }}>
                <div style={{ ...iconStyle, backgroundColor: '#DCEDFC' }} onClick={() => alert('write a message')}>
                    <MessageFilled style={{ color: '#50A6F1' }} />
                </div>
            </li>
            <li style={{ ...listItemStyle }}>
                <div style={{ ...iconStyle, backgroundColor: '#FCDAE2' }} onClick={ToogleHeartClick}>
                   {isHeartFilled ? <HeartOutlined /> : <HeartFilled />} 
                </div>
            </li>
            <li style={{ ...listItemStyle }}>
                <div style={{ ...iconStyle, backgroundColor: '#CDF7EC' }}>
                    <Call style={{ color: '#0BD6A0' }} />
                </div>
            </li>
            <li style={{ ...listItemStyle }}>
                <div style={{ ...iconStyle, backgroundColor: '#FFF6DF' }}>
                    <Video />
                </div>
            </li>
            <li style={{ ...listItemStyle }}>
                <div style={{ ...iconStyle, backgroundColor: '#E2E3F3' }}>
                <EllipsisOutlined  style={{ color: '#2E3236' }} />
                </div>
            </li>
        </ul>
    );
};

export default ListIcon;
