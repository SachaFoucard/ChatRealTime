import React, { createContext, useEffect, useState } from 'react'

export const UserContext = createContext();

export default function UserContextProvider({ children }) {

  const [selectedFeature, setSelectedFeature] = useState("Messages"); // menu click nav

  const [user, setUser] = useState({
    "gender": "female",
    "name": {
      "title": "Miss",
      "first": "Zoe",
      "last": "Oliver"
    },
    "email": "zoe.oliver@example.com",
    "picture": {
      "large": "https://randomuser.me/api/portraits/women/25.jpg",
      "medium": "https://randomuser.me/api/portraits/med/women/25.jpg",
      "thumbnail": "https://randomuser.me/api/portraits/thumb/women/25.jpg"
    },
    "nat": "GB"
  }
  ); // click on user message 

  const [openInfo, setOpenInfo] = useState(false)
  // toggle Open/Close the feature User-info on the right page

  const [me, setMe] = useState(null)

  const value = {
    selectedFeature,
    setSelectedFeature,
    user,
    setUser,
    setOpenInfo,
    openInfo,
    setMe,
    me
  }
  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    const initialUserData = storedUserData ? JSON.parse(storedUserData) : null;
    setMe(initialUserData);
  }, [])

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}
