import React, { useState, useContext } from 'react'
import { Input, Space } from 'antd';
import { SearchOutlined, PlusSquareTwoTone } from '@ant-design/icons'
import Person from './Person';
import { UserContext } from '../Context/UserContext';
import { message } from 'antd';
import ModalAddContact from '../Widgets.jsx/ModalAddContact'

export default function Contacts() {

  const [data, setData] = useState([]);
  const { me } = useContext(UserContext)
  const [isModalVisible, setIsModalVisible] = useState(false); // State to control modal visibility


  const appendData = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/getContacts/${me?._id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const body = await response.json();
      setData(body.Allcontacts);
    } catch (error) {
      console.error(error);
      message.error('Failed to load more items');
    }
  };

  const handleSquareIconClick = () => {
    setIsModalVisible(true); // Show the modal when the square icon is clicked
  };


  return (
    <div className='BarMenu'>
      <div className='contact-header-container'>
        <span style={{ display: 'flex', justifyContent: "space-between" }}>
          <h2>Contact ({data.length})</h2>

          <PlusSquareTwoTone onClick={handleSquareIconClick} style={{ fontSize: 30, border: 10, borderColor: 'green', cursor: 'pointer' }} />

        </span>
        <Space direction="vertical" size="middle">
          <Space.Compact size="large">
            <Input addonBefore={<SearchOutlined />} placeholder="Search contacts" />
          </Space.Compact>
        </Space>

      </div>
      <div className='list-contacts-body'>
        <Person appendData={appendData} me={me} data={data} />
      </div>
      <ModalAddContact isVisible={isModalVisible} setIsVisible={setIsModalVisible} />
    </div>
  )
}
