import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'antd';
import { CloseOutlined,VideoCameraOutlined } from '@ant-design/icons';

const VideoCall = ({ user }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(true);

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

  const handleEndCall = () => {
    setModalOpen(false);
    setIsActive(false);
    setSeconds(0);
  };

  const handlePhoneIconClick = () => {
    setModalOpen(true);
    setIsActive(true);
};

  return (
    <>
      <VideoCameraOutlined onClick={handlePhoneIconClick} style={{ fontSize: 18, color: 'grey' }} />
      <Modal
        centered
        open={modalOpen}
        footer={null}
        onCancel={handleEndCall}
        width={(500)}
      >
        <div className='video-call-container'>
          <div className='camera-window'>
            {/* Include your camera video component here */}
            {/* Example: <video autoPlay muted playsInline controls /> */}
            <div className='camera-example' />
          </div>
          <div className='video-user'>
            <img src={user?.picture?.large} alt={user?.name?.last} />
            <div className='video-user-informations'>
              <h3>{user?.name?.last}</h3>
              <h6>{formattedTime()}</h6>
            </div>
          </div>
          <Button type="primary" danger onClick={handleEndCall}>End Call</Button>
          <CloseOutlined className='end-call-button' onClick={handleEndCall} />
        </div>
      </Modal>
    </>
  );
};

export default VideoCall;
