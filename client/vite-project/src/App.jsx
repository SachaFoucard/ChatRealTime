import React from 'react';
import './index.css';
import UserContextProvider from './Context/UserContext';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Home from './Pages/Home';
import NotFound from './Pages/NotFound';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import  ChatContextProvider  from './Context/ChatContext'; // Make sure to import ChatContextProvider

const App = () => {
  return (
    <Router>
      <UserContextProvider>
        <ChatContextProvider> {/* Use ChatContextProvider instead of ChatContext */}
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/userNo/:id' element={<Home />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </ChatContextProvider>
      </UserContextProvider>
    </Router>
  );
};

export default App;
