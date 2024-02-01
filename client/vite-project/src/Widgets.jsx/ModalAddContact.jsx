import React, { useContext, useState } from 'react';
import { Modal, message, Input, List, Avatar } from 'antd';
import { UserContext } from '../Context/UserContext';
const { Search } = Input;

const ModalAddContact = ({ isVisible, setIsVisible }) => {
  const [input, setInput] = useState('');
  const [userFound, setUserFound] = useState(null);
  const [loading, setLoading] = useState(false);
  const { me } = useContext(UserContext)

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

  const addContact = async () => {
    try {
      // Check if both me and userFound are defined
      if (!me || !userFound) {
        message.error('Invalid user data');
        return;
      }
  
      const response = await fetch(`http://localhost:8000/api/addContact/${me._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user2: userFound._id,
        })
      });
  
      const data = await response.json();
  
      if (response.status === 200) {
        message.success('User added successfully');
      } else if (response.status === 404) {
        message.error(data.message); // Display the error message from the backend
      } else if (response.status === 401) {
        message.error('Contact already in your list');
      }
    } catch (error) {
      console.error(error);
      message.error('Failed to add user');
    }
  };
  

  const hideModal = () => {
    setIsVisible(false);
  };

  return (
    <Modal
      title="ADD CONTACT"
      open={isVisible}
      onOk={addContact}
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
