import React, { useContext } from 'react';
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
            const data = await fetch('http://localhost:8000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    mail: values?.username,
                    password: values?.password,
                    username: values?.username,
                })
            })
            const response = await data.json();
            console.log("response", response);

            if (data.status === 201) {
                message.success(`Welcome ${me?.username}`);
                navigate(`/userNo/:${me?._id}`)
            }
            else {
                console.log('rrr');
                message.error('try an other time, something wron.');
            }

        } catch (error) {
            message.error('try an other time, something wrong...');
            console.error('Login error', error);
        }
    };

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
