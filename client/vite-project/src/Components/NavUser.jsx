import React, { useContext, useEffect } from 'react'
import { FolderOutlined, AudioMutedOutlined, DeleteOutlined, InboxOutlined, InfoCircleFilled, SettingTwoTone } from '@ant-design/icons'
import { Avatar } from 'antd'
import { UserContext } from '../Context/UserContext'
import SearchWord from '../Widgets.jsx/Nav/SearchWord'
import Call from '../Widgets.jsx/Nav/Call'
import Video from '../Widgets.jsx/Nav/Video'
import OptionBtn from '../Widgets.jsx/OptionBtn'
import { useNavigate } from 'react-router-dom'

export default function NavUser() {
    const { user, openInfo, setOpenInfo, setMe } = useContext(UserContext)
    const navigate = useNavigate()
    const items = [
        {
            key: 5,
            label: 'Archive',
            icon: <FolderOutlined />
        },
        {
            key: 2,
            label: 'Muted',
            icon: <AudioMutedOutlined />
        },
        {
            key: 3,
            label: 'Delete',
            icon: <DeleteOutlined />
        }
    ]

    const Logout = () => {
        localStorage.removeItem('userData')
        setMe(null)
        navigate('/')
    }

    useEffect(() => {

    }, [user])


    return (
        <>
            <div id='bar-user' className='bar-user'>
                <div className='dicussions-profil-user'>
                    {user?.picture ? <img src={user?.picture} /> : <Avatar
                        style={{
                            backgroundColor: '#f56a00',
                        }}
                    >
                        {user?.username.slice(0, 1)}
                    </Avatar>}
                    <div className='name-status'>
                        <h4>{user?.username}</h4>
                        <p>Online</p>
                    </div>
                </div>
                <div className='dicussions-profil-nav'>
                    <ul>
                        <li><SearchWord /></li>
                        <li><Call /></li>
                        <li><Video /></li>
                        <li><InboxOutlined style={{ fontSize: 18, color: 'grey' }} /></li>
                        <li ><InfoCircleFilled onClick={() => setOpenInfo(!openInfo)} style={{ fontSize: 18, color: 'grey' }} /></li>
                        <li><OptionBtn items={items} color={"grey"} /></li>
                        <li><SettingTwoTone onClick={() => Logout()} spin="true" twoToneColor="green" style={{ fontSize: 18 }} /></li>
                    </ul>
                </div>
            </div >
        </>
    )
}