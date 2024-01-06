import { FolderOutlined, AudioMutedOutlined, DeleteOutlined, CloseOutlined, CheckCircleTwoTone, EnvironmentOutlined, MailOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons';

import OptionBtn from '../Widgets.jsx/OptionBtn';
import ListIcon from '../Widgets.jsx/ListIcon';

import { useContext } from 'react';
import { UserContext } from '../Context/UserContext';

export default function InfoUser({ user }) {
    const items = [
        {
            key: 1,
            label: 'Archive',
            icon: <FolderOutlined />,
        },
        {
            key: 2,
            label: 'Muted',
            icon: <AudioMutedOutlined />,
        },
        {
            key: 3,
            label: 'Delete',
            icon: <DeleteOutlined />,
        },
    ];

    const userData = [
        { value: user?.name?.last, icon: <UserOutlined style={{ fontSize: 13 }} /> },
        { value: '+1234567890', icon: <PhoneOutlined style={{ fontSize: 13 }} /> },
        { value: user?.email, icon: <MailOutlined style={{ fontSize: 13 }} /> },
        { value: 'Ramat Gan, Israel', icon: <EnvironmentOutlined style={{ fontSize: 13 }} /> },
    ];


    const { openInfo, setOpenInfo } = useContext(UserContext);

    return (
        <>
            <div className='feature-info-user'>
                <div className='block-info-user'>
                    <img src={user.picture.large} alt='pp' />
                    <div>
                        
                    </div>
                    <div className='icons-onImage'>
                        <span onClick={() => setOpenInfo(!openInfo)} className='close-icon'><CloseOutlined style={{ color: 'white' }} /></span>
                        <span className='options-icon' ><OptionBtn items={items} color={"white"} /> </span>
                        <span className='name-user'><h3>{user.name.last}</h3></span>
                        <span className='online-status'><p><CheckCircleTwoTone twoToneColor="#52c41a" /> &nbsp;Online</p></span>
                    </div>
                </div>
                <hr />
                <div className='list-icon'>
                    <ListIcon />
                </div>
                <hr />
                <div className='informations-user'>
                    <div className='status-user'>
                        <p>STATUS:</p>
                        <p>A professional profile is a brief summary of your skills, strengths, and key experiences.</p>
                    </div>
                    <div className='infos-user'>
                        <p>INFO:</p>
                        {userData.map((item, index) => (
                            <li key={index} className='li-n cl-gr fts-18 lh-10'>
                                <span className="icon">{item.icon}</span>
                                <strong>{item.label}</strong> {item.value}
                            </li>
                        ))}
                    </div>
                </div>
                <hr />
                <div className='group-communs'>
                    <h6>GROUP IN COMMON</h6>
                    <div className='infos-user'>
                        <p>INFO:</p>
                        {userData.map((item, index) => (
                            <li key={index} className='li-n cl-gr fts-18 lh-10'>
                                <span className="icon">{item.icon}</span>
                                <strong>{item.label}</strong> {item.value}
                            </li>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
