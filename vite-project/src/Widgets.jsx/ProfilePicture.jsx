import { UserOutlined } from '@ant-design/icons';
import React from 'react';
import { Avatar, Space } from 'antd';

const ProfilePicture = () => (

    <Space size={16} wrap>
        <Avatar size={60}
            style={{
                backgroundColor: '#87d068',
                border:'10px',
                borderColor:'#F6F6F9',
            }}
            icon={<UserOutlined />}
        />
    </Space>
);
export default ProfilePicture;