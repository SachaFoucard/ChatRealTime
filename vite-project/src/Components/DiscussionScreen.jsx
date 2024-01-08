// DiscussionScreen.js
import NavUser from './NavUser';
import React from 'react';
import { useContext } from 'react';
import { UserContext } from '../Context/UserContext';
import InfoUser from './InfoUser'
import ChatBox from './ChatBox'
import { useState } from 'react';

export default function DiscussionScreen() {

  const { user } = useContext(UserContext)
  const { openInfo } = useContext(UserContext)

  const [messages, setMessages] = useState([]);

  const handleSendMessage = (newMessage) => {
    setMessages([...messages, newMessage]);
  };


  return (
    <>
      <div className='popo'>


        <div className='dicussions-messages'>
          <NavUser user={user} />
          <ChatBox messages={messages} onSendMessage={handleSendMessage} />
        </div>
        {openInfo && <InfoUser user={user} />}
      </div>
    </>
  );
}
