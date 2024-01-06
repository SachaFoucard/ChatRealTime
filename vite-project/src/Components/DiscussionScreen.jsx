// DiscussionScreen.js
import NavUser from './NavUser';
import React from 'react';
import { useContext } from 'react';
import { UserContext } from '../Context/UserContext';

export default function DiscussionScreen() {

  const { user } = useContext(UserContext)

  return (
    <>
      <div className='dicussions-messages'>
        <NavUser user={user} />
      </div>
    </>
  );
}
