import React from 'react';
import { Dropdown, Space } from 'antd';
import { MoreOutlined } from '@ant-design/icons'

const OptionBtn = ({ color, items }) => (
    <Dropdown
        menu={{
            items,
        }}
    >
        <a onClick={(e) => e.preventDefault()}>
            <Space>
                <MoreOutlined style={{ color: color, fontSize: 22, cursor: 'pointer'}} />
            </Space>
        </a>
    </Dropdown>
);
export default OptionBtn;