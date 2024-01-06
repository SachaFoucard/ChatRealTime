import React from 'react'
import OptionBtn from '../Widgets.jsx/OptionBtn'
import ImgBgProfile from '../assets/backgroundProfile.jpg'
import ProfilePicture from '../Widgets.jsx/ProfilePicture'
import { UserOutlined, PhoneOutlined, MailOutlined, EnvironmentOutlined } from '@ant-design/icons'
import { QuestionCircleOutlined, SettingOutlined, InfoCircleOutlined } from '@ant-design/icons';

export default function MyProfile() {

  const userData = [
    { value: 'Sacha Foucard', icon: <UserOutlined /> },
    { value: '+1234567890', icon: <PhoneOutlined /> },
    { value: 'sachafou@gmail.com', icon: <MailOutlined /> },
    { value: 'Ramat Gan, Israel', icon: <EnvironmentOutlined /> },
  ];

  const items = [
    {
        key: '1',
        label: 'Infos',
        icon: <InfoCircleOutlined />
    },
    {
        key: '2',
        label: 'Settings',
        icon: <SettingOutlined />
    },
    {
        key: '4',
        label: 'Help',
        icon: <QuestionCircleOutlined />
    }
];



  return (
    <>
      <div className='BarMenu'>
        <div className='header-profile'>
          <img className="img-bg-profile" src={ImgBgProfile} />
          <div className='title_option'>
            <h2>My profil</h2>
            <OptionBtn items={items} color={"white"}/>
          </div>
        </div>

        <div className='profil-container'>
          <div className='profile-infos'>
            <ProfilePicture />
            <div className='profile-text'>
              <h2>Sacha Foucard</h2>
              <h4 className='cl-gr'>Front end Developer</h4>
            </div>
            <hr />
          </div>
        </div>

        <div className='description_contacts-container'>
          <h3 className='cl-gr'>A professional profile is an introductory section on your resume that highlights your relevant qualifications and skills.</h3>
          {userData.map((item, index) => (
            <li key={index} className='li-n cl-gr fts-18'>
              <span className="icon">{item.icon}</span>
              <strong>{item.label}</strong> {item.value}
            </li>
          ))}
        </div>
      </div>
    </>
  )
}
