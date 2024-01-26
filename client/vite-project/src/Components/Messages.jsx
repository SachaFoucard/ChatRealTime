import React, { useContext, useEffect, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Input, Space } from 'antd';
import FavoritesMess from './FavoritesMess';
import DirectMessage from './DirectMessage';
import { UserContext } from '../Context/UserContext';

const { Search } = Input;

export default function Messages() {
  const { me } = useContext(UserContext)
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [hasMoreData, setHasMoreData] = useState(true); // Track if there's more data to load
  const [search, setSearchResults] = useState('')

  useEffect(() => {
    // Filter data based on input
    const filteredData = data.filter(item => {
      return item.username.toLowerCase().includes(input.toLowerCase());
    });
    setSearchResults(filteredData);
  }, [input, data]);

  const loadContactFromUser = async () => {
    if (!me || !me._id || loading || !hasMoreData) {
        return;
    }
    setLoading(true);
    try {
        const response = await fetch(`http://localhost:8000/api/getContacts/${me._id}`);
        const body = await response.json();
        if (body?.Allcontacts) {
            setData(body?.Allcontacts);
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
    setInput(e.target.value);
  };

 
  return (
    <div className='BarMenu'>
      <div className='Messages-header-container'>
        <h2>Messages (128)</h2>
        <Space direction="vertical" size="middle">
          <Space.Compact size="large">
            <Input addonBefore={<SearchOutlined />} onChange={handleInputChange} placeholder="Search here..." />
          </Space.Compact>
        </Space>
      </div>
      <div className='Messages-content'>
        <div className='Favorites-messages'>
          <FavoritesMess />
        </div>
        <div className='Messages-directe' style={{ maxHeight: 'calc(100vh - 120px)' }}>
          <DirectMessage loadContactFromUser={loadContactFromUser} data={search} hasMoreData={hasMoreData} search={search} />
        </div>
      </div>
    </div>
  );
}
