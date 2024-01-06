import React, { createContext, useState } from 'react'

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

  const [openInfo, setOpenInfo] = useState(true)
  // toggle Open/Close the feature User-info on the right page


  const value = {
    selectedFeature,
    setSelectedFeature,
    user,
    setUser,
    setOpenInfo,
    openInfo
  }

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}
