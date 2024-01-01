import React, { createContext, useState } from 'react'

export const UserContext = createContext();

export default function UserContextProvider({ children }) {

    const [selectedFeature, setSelectedFeature] = useState("Messages");

    const value = {
        selectedFeature,
        setSelectedFeature
    }
    
    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}
