import React, { useContext, useEffect } from 'react';
import { Form, Input, Button, Checkbox, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import '../Styles/login.css'; // Import your custom styles
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../Context/UserContext';

const Login = () => {

    const { setMe, me } = useContext(UserContext);
    const navigate = useNavigate()

    const onFinish = async (values) => {
        try {
            const data = await fetch('http://localhost:3000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    mail: values?.username,
                    password: values?.password,
                    username: values?.username,
                })
            });

            const response = await data.json();
            setMe(response?.user);
            sessionStorage.setItem('userData', JSON.stringify(response?.user));

            if (data.status === 201) {
                navigate(`/userNo/:${response?.user?._id}`);
                message.success(`Welcome ${response?.user?.username}`);
            } else {
                message.error('Try again, something went wrong.');
            }

        } catch (error) {
            message.error('Try again, something went wrong...');
            console.error('Login error', error);
        }
    };

    useEffect(() => {
        const lastUserConnected = sessionStorage.getItem('userData');
        if (lastUserConnected){
            navigate(`/userNo/:${lastUserConnected._id}`);
        }
    })

    return (
        <div className="login-container">
            <div className="login-content">
                <h1>Welcome Back !</h1>
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: 'Please input your Username!' }]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username or email" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your Password!' }]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                        <a className="login-form-forgot" href="/">
                            Forgot password
                        </a>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                        </Button>
                        Or <Link to="/Register">register now! </Link>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default Login;
