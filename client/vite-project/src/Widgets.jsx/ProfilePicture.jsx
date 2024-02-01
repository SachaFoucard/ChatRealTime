import { UserOutlined } from '@ant-design/icons';
import React, { useRef, useState, useEffect } from 'react';
import { Avatar, Space } from 'antd';
import { useContext } from 'react';
import { UserContext } from '../Context/UserContext';

const ProfilePicture = () => {
    const fileInputRef = useRef(null);
    const [DataImage, setDataImage] = useState(null);
    const { me } = useContext(UserContext)

    const handleAvatarClick = () => {
        // Trigger click on file input when the avatar is clicked
        fileInputRef.current.click();
    };

    const handleFileChange = async (event) => {
        try {
            const file = event.target.files[0];
            if (file) {
                const formData = new FormData();
                formData.append("image", file);
                formData.append("_id", me?._id); // Add ID to the FormData

                const response = await fetch("http://localhost:8000/api/add", {
                    method: "POST",
                    body: formData,
                });
                const data = await response.json();
                // Update the image data with the URL returned from the server
                setDataImage(URL.createObjectURL(file)); // Set DataImage to the URL of the uploaded image
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        console.log('new me');
    }, [me])

    return (
        <Space size={16} wrap>
            <Avatar
                size={60}
                style={{
                    backgroundColor: '#87d068',
                    border: '10px',
                    borderColor: '#F6F6F9',
                    cursor: 'pointer', // Add cursor pointer to indicate clickable
                }}
                icon={DataImage ? <img src={DataImage} alt="User Picture" /> : (me?.picture ? <img src={me.picture} alt="User Picture" /> : <UserOutlined />)} // Conditionally render uploaded image, user's picture or UserOutlined icon
                onClick={handleAvatarClick} // Trigger file input click on avatar click
            />
            {/* Hidden file input to select an image from desktop */}
            <form method='post' encType="multipart/form-data" onSubmit={(e) => e.preventDefault()}>
                <input
                    name="image"
                    type="file"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    accept="image/*" // Accept only image files
                    onChange={handleFileChange} // Handle file change event
                />
            </form>
        </Space>
    );
};

export default ProfilePicture;
