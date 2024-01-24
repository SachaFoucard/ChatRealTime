import React, { useContext } from 'react';
import OptionBtn from '../Widgets.jsx/OptionBtn';
import ImgBgProfile from '../assets/backgroundProfile.jpg';
import ProfilePicture from '../Widgets.jsx/ProfilePicture';
import { UserOutlined, PhoneOutlined, MailOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { QuestionCircleOutlined, SettingOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { UserContext } from '../Context/UserContext';

export default function MyProfile() {
  const { me } = useContext(UserContext);

  const userData = [
    { value: me?.username, icon: <UserOutlined style={{ fontSize: '16px' }} /> },
    { value: me?.phone, icon: <PhoneOutlined style={{ fontSize: '16px' }} /> },
    { value: me?.mail, icon: <MailOutlined style={{ fontSize: '16px' }} /> },
  ];

  const items = [
    {
      key: '1',
      label: 'Infos',
      icon: <InfoCircleOutlined style={{ fontSize: '16px' }} />,
    },
    {
      key: '2',
      label: 'Settings',
      icon: <SettingOutlined style={{ fontSize: '16px' }} />,
    },
    {
      key: '4',
      label: 'Help',
      icon: <QuestionCircleOutlined style={{ fontSize: '16px' }} />,
    }
    ];

  console.log('meMyProfil', me);

  return (
    <>
      <div className='BarMenu'>
        <div className='header-profile'>
          <img className="img-bg-profile" src={ImgBgProfile} alt='background' />
          <div className='title_option'>
            <h2>My profile</h2>
            <OptionBtn items={items} color={"white"} />
          </div>
        </div>

        <div className='profil-container'>
          <div className='profile-infos'>
            <ProfilePicture />
            <div className='profile-text'>
              <h2>{me?.firstName} {me?.lastName}</h2>
              <h4 className='cl-gr'>{me?.jobTitle}</h4>
            </div>
            <hr />
          </div>
        </div>

        <div className='description_contacts-container'>
          <h3 className='cl-gr'>{me?.description}</h3>
          {userData.map((item, index) => (
            <li key={index} className='li-n cl-gr fts-18'>
              <span className="icon">{item.icon}</span>
              <strong>{item.label}</strong> {item.value}
            </li>
          ))}
        </div>
      </div>
    </>
  );
}
