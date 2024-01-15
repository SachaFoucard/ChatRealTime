import React from 'react'
import { Input, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons'
import Person from './Person';

export default function Contacts() {
  return (
    <div className='BarMenu'>
      <div className='contact-header-container'>
        <h2>Contact (128)</h2>
        <Space direction="vertical" size="middle">
          <Space.Compact size="large">
            <Input addonBefore={<SearchOutlined />} placeholder="Search contacts" />
          </Space.Compact>
        </Space>
      </div>
      <div className='list-contacts-body'>
        <Person />
      </div>
    </div>
  )
}
