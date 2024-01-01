// App.js

import React from 'react';
import UserContextProvider from './Context/UserContext';
import Nav from './Components/Nav';
import Menu from './Components/Menu';
import DiscussionScreen from './Components/DiscussionScreen';
import './index.css';

const App = () => {
  return (
    <UserContextProvider>
      <div className='container'>
        <Nav />
        <Menu />
        <DiscussionScreen />
      </div>
    </UserContextProvider>
  );
};

export default App;
