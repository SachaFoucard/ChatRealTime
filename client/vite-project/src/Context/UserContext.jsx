import React, { createContext, useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'


export const UserContext = createContext();

export default function UserContextProvider({ children }) {
  const nav = useNavigate()

  const [selectedFeature, setSelectedFeature] = useState("Messages"); // menu click nav

  const [user, setUser] = useState(null); // click on user message 

  const [openInfo, setOpenInfo] = useState(false)
  // toggle Open/Close the feature User-info on the right page

  const [me, setMe] = useState(null)

  const [onlineUsers, setOnlineUsers] = useState([]);



  const value = {
    selectedFeature,
    setSelectedFeature,
    user,
    setUser,
    setOpenInfo,
    openInfo,
    setMe,
    me,
    setOnlineUsers, onlineUsers,
  }

  useEffect(() => {
    const storedUserData = sessionStorage.getItem('userData');
    const initialUserData = storedUserData ? JSON.parse(storedUserData) : null;
    setMe(initialUserData);
  }, [me?._id]);


  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}
