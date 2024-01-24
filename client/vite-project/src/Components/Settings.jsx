import React, { useContext, useState } from 'react'
import { EditOutlined } from '@ant-design/icons'
import img from '../assets/backgroundProfile.jpg'
import ProfilePicture from '../Widgets.jsx/ProfilePicture'
import Mode from '../Widgets.jsx/Mode'
import MyForm from './MyForm'
import { UserContext } from '../Context/UserContext'

export default function Settings() {
  const { me } = useContext(UserContext)
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setFile(reader.result);
      };

      reader.readAsDataURL(selectedFile);
    }
  }

  const handleIconClick = () => {
    // Trigger the file input when the icon is clicked
    document.getElementById('fileInput').click();
  };

  return (
    <>
      <div className='BarMenu'>
        <div className='header-profile'>
          <img className="img-bg-profile" src={file ? file : img} />
          <div className='title_option'>
            <h2>Settings</h2>
            <input id='fileInput' type='file' onChange={handleChange} style={{ display: 'none' }} />
            <EditOutlined style={{ fontSize: 20, cursor: 'pointer' }} onClick={handleIconClick} />
          </div>
        </div>

        <div className='profil-container'>
          <div className='profile-infos'>
            <ProfilePicture />
            <div className='profile-text'>
              <h2>{me?.username}</h2>
              <Mode />
            </div>
          </div>
        </div>

        <div className='DropDown-informations'>
          <MyForm />
        </div>

      </div>

    </>
  )
}
