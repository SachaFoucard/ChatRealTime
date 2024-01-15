import React, { useState } from 'react';
import { Dropdown, Input, Menu } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
const SearchWord = () => {
  const [visible, setVisible] = useState(false);

  const menu = (
    <Menu>
      <Menu.Item key="1">
        <div>
          <Input
            placeholder="Search"
            prefix={<SearchOutlined />}
            onClick={(e) => e.stopPropagation()} // Prevent dropdown from closing when clicking inside the input
          />
        </div>
      </Menu.Item>
    </Menu>
  );

  const handleVisibleChange = (flag) => {
    setVisible(flag);
  };

  return (
    <Dropdown
      overlay={menu}  
      trigger={['click']}
      visible={visible} 
      onVisibleChange={handleVisibleChange}
    >
      <SearchOutlined style={{ fontSize: 18, color: 'grey' }} />
    </Dropdown>
  );
};

export default SearchWord;
