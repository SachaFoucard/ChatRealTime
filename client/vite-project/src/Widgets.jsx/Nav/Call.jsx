import React, { useContext, useState, useEffect } from 'react';
import { Modal } from 'antd';
import { PhoneFilled, VideoCameraOutlined, AudioMutedOutlined, UserAddOutlined, NotificationOutlined, PoweroffOutlined, MessageOutlined, AudioOutlined } from '@ant-design/icons';
import { UserContext } from '../../Context/UserContext';

const Call = () => {
    const { user } = useContext(UserContext);
    const [modal2Open, setModal2Open] = useState(false);

    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(false);

    const [sound, setSound] = useState(true);

    useEffect(() => {
        let interval;

        if (isActive) {
            interval = setInterval(() => {
                setSeconds((prevSeconds) => prevSeconds + 1);
            }, 1000);
        } else {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [isActive]);

    const formattedTime = () => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    };

    const handlePhoneIconClick = () => {
        setModal2Open(true);
        setIsActive(true);
    };

    const handleModalCancel = () => {
        setModal2Open(false);
        setIsActive(false);
        setSeconds(0)
    };

    return (
        <>
            <PhoneFilled onClick={handlePhoneIconClick} style={{ fontSize: 18, color: 'grey' }} />
            <Modal
                centered
                open={modal2Open}
                footer={null}
                onCancel={handleModalCancel}
            >
                <div className='call-user' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                    <img src={user?.picture?.large} alt={user?.name?.last} />
                    <div className='lh-5'>
                        <h3>{user?.name?.last}</h3>
                        <h6>{formattedTime()}</h6>
                    </div>
                    <ul className='li-n ul-icon'>
                        <li className='icon-red'><VideoCameraOutlined /></li>
                        <li className='icon-green'><NotificationOutlined /></li>
                        <li className='icon-blue'><UserAddOutlined /></li>
                    </ul>
                    <div className='phone-icon' onClick={handleModalCancel}>
                        <PoweroffOutlined style={{cursor:"pointer"}} />
                    </div>
                    <div className='options'>
                        <span style={{ color: 'white', fontSize: 20 }}> <MessageOutlined /></span>
                        <span onClick={() => setSound(!sound)} style={{ color: 'white', fontSize: 20,cursor:"pointer" }}>{sound ? <AudioMutedOutlined /> : <AudioOutlined />}</span>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default Call;
