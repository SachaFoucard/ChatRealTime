// Nav.js

import React, { useState } from 'react';
import { UserOutlined, MessageOutlined, ContactsOutlined, SettingOutlined } from '@ant-design/icons';
import { Button, Avatar } from 'antd';
import { useContext } from 'react';
import { UserContext } from '../Context/UserContext';

export default function Nav() {
    const [icons, setIcons] = useState([
        {
            IconName: <UserOutlined />,
            Component: 'Profile'
        },
        {
            IconName: <MessageOutlined />,
            Component: 'Messages'
        },
        {
            IconName: <ContactsOutlined />,
            Component: 'Contacts'
        },
        {
            IconName: <SettingOutlined />,
            Component: 'Settings'
        }
    ]);

    const {selectedFeature,setSelectedFeature} = useContext(UserContext)


    return (
        <div className='Nav-container'>
            <div className='Icons-list column'>
                {icons.map((icon, index) => (
                    <Button  key={index} shape="circle" icon={icon.IconName} onClick={() => setSelectedFeature(icon.Component)} />
                ))}
            </div>
            <div className='IconProfil'>
                <Avatar className='avatar' size={64} icon={<UserOutlined />} />
            </div>
        </div>
    );
}
