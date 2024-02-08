import React, { useContext, useEffect, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Input, Space } from 'antd';
import FavoritesMess from './FavoritesMess';
import DirectMessage from './DirectMessage';
import { UserContext } from '../Context/UserContext';
import { message } from 'antd'

const { Search } = Input;

export default function Messages() {
  const { me, setUser } = useContext(UserContext);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [contactsOpenChat, setContactsOpenChat] = useState([]);
  const [hasMoreData, setHasMoreData] = useState(true); // Track if there's more data to load

  // Fetch chat data from the server when the component mounts
  useEffect(() => {
    GetChat();
  }, []);

  const GetChat = async () => {
    if (!me?._id || loading || !hasMoreData) {
      return;
    }
    setLoading(true);
    try {
      const data = await fetch(`http://localhost:8000/api/findChat/${me?._id}`);
      const response = await data.json();
      if (response) {
        setContactsOpenChat(response);
      } else {
        setHasMoreData(false); // No more data to load
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    e.preventDefault()
    if (!search) return;
    if (search.length < 3) { return message.warning('Search term must be at last 3 character long') }
    const userSearch = contactsOpenChat.find((u) => u.username.toLowerCase().includes(search.toLocaleLowerCase()))
    if (userSearch) {
      setUser(userSearch)
      setSearch('')
    } else {
      message.error('not search user found !')
    }
  };

  return (
    <>
      <div className='BarMenu'>
        <div className='Messages-header-container'>
          <h2>Chats ({contactsOpenChat.length})</h2>
          <Space direction="vertical" size="middle">
            <Space.Compact size="large" onClick={handleInputChange} style={{cursor:'pointer'}}>
              <Input addonBefore={<SearchOutlined />} value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search here..." />
            </Space.Compact>
          </Space>
        </div>
        <div className='Messages-content'>
          <div className='Favorites-messages'>
            <FavoritesMess />
          </div>
          <div className='Messages-directe' style={{ maxHeight: 'calc(100vh - 120px)' }}>
            <DirectMessage GetChat={GetChat} contactsOpenChat={contactsOpenChat} hasMoreData={hasMoreData} me={me} />
          </div>
        </div>
      </div>
    </>
  );
}
