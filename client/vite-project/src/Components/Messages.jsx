import {useEffect} from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Input, Space } from 'antd';
import FavoritesMess from './FavoritesMess';
import DirectMessage from './DirectMessage';

const { Search } = Input;

export default function Messages() {
  useEffect(()=> {
    // refresh data here to update the contactFav and ContactUser
  },[])
  return (
    <div className='BarMenu'>
      <div className='Messages-header-container'>
        <h2>Messages (128)</h2>
        <Space direction="vertical" size="middle">
          <Space.Compact size="large">
            <Input addonBefore={<SearchOutlined />} placeholder="Search here..." />
          </Space.Compact>
        </Space>
      </div>
      <div className='Messages-content'>
        <div className='Favorites-messages'>
          <FavoritesMess />
        </div>
        <div className='Messages-directe' style={{ maxHeight: 'calc(100vh - 120px)' }}>
          <DirectMessage />
        </div>
      </div>
    </div>
  );
}
