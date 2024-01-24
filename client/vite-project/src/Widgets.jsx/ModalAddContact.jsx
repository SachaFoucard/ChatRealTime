import { ExclamationCircleOutlined, AudioOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { Button, Modal, Space, Input, List, Avatar } from 'antd';
const { Search } = Input;

const ModalAddContact = ({ isVisible, setIsVisible }) => {
  const [input, setInput] = useState('');
  const [userFound, setUserFound] = useState(null);
  const [loading, setLoading] = useState(false);

  const onSearch = async () => {
    try {
      setLoading(true);

      const data = await fetch(`http://localhost:8000/api/searchUser/${input}`);
      const response = await data.json();
      setUserFound(response);
      setLoading(false); // Set loading to false after fetching data

    } catch (error) {
      console.log(error);
      setLoading(false); // Set loading to false in case of an error
    }
  };

  const hideModal = () => {
    setIsVisible(false);
  };

  return (
    <Modal
      title="ADD CONTACT"
      open={isVisible}
      onOk={hideModal}
      onCancel={hideModal}
      okText="ADD"
      cancelText="CANCEL"
    >
      <Search onChange={(e) => setInput(e.target.value)} placeholder="Enter email address" onSearch={onSearch} loading={loading} />
      <br />
      <br />
        {loading ? (
          <p>Loading...</p>
        ) : userFound ? (
          <List.Item>
            <List.Item.Meta
              avatar={
                userFound?.picture ? (
                  <Avatar src={userFound?.picture} />
                ) : (
                  <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />
                )
              }
              title={userFound.username}
            />
          </List.Item>
        ) : (
          <p>No user found</p>
        )}
    </Modal>
  );
};

export default ModalAddContact;
