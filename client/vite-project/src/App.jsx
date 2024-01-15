import React from 'react';
import './index.css';
import UserContextProvider from './Context/UserContext';
import Login from './Pages/Login';
import Register from './Pages/Register'
import Home from './Pages/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NotFound from './Pages/NotFound';

const App = () => {
  return (
    <BrowserRouter>
      <UserContextProvider>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path="*" element={<NotFound />} />
          <Route path='/userNo/:id' element={<Home />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </UserContextProvider>
    </BrowserRouter>
  );
};

export default App;
