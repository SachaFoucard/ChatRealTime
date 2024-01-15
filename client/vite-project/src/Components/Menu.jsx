// Menu.js

import React, { useContext } from 'react';
import MyProfile from '../Components/MyProfile';
import Messages from './Messages';
import Contacts from './Contacts';
import Settings from './Settings';
import { UserContext } from '../Context/UserContext';

export default function Menu() {

    const { selectedFeature } = useContext(UserContext)

    return (
        <>
        {selectedFeature === "Profile" ? <MyProfile /> : selectedFeature === "Messages" ? <Messages /> : selectedFeature === "Contacts" ? <Contacts /> : selectedFeature === "Settings" ? <Settings /> : null }
        </>
    )


}
