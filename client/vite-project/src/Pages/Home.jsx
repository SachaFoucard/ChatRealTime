import React from 'react'
import Nav from '../Components/Nav';
import Menu from '../Components/Menu';
import DiscussionScreen from '../Components/DiscussionScreen';

export default function Home() {
    
    return (
        <>
            <div className='container'>
                <Nav />
                <Menu />
                <DiscussionScreen />
            </div>
        </>
    )
}
