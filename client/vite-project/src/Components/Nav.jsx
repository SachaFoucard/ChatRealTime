import React, { useContext } from 'react';
import { UserOutlined, MessageOutlined, ContactsOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Menu } from 'antd';
import { UserContext } from '../Context/UserContext';

const { SubMenu } = Menu;

export default function Nav() {
    const { selectedFeature, setSelectedFeature } = useContext(UserContext);

    const icons = [
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
    ];
 

    return (
        <div className='Nav-container'>
            <Menu mode="vertical" theme="dark">
                {icons.map((icon, index) => (
                    <Menu.Item key={index} icon={icon.IconName} onClick={() => setSelectedFeature(icon.Component)} />
                ))}
            </Menu>
            <div className='IconProfil'>
                <Avatar className='avatar' size={64} icon={<UserOutlined />} />
            </div>
        </div>
    );
}
