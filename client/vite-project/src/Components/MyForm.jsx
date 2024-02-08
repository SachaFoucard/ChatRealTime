import React, { useState, useContext, useEffect } from 'react';
import { Form, Input, Button, Collapse } from 'antd';
import { Select, Switch } from 'antd';
import { UserContext } from '../Context/UserContext';

const { Panel } = Collapse;

const MyForm = () => {
    const [form] = Form.useForm();
    const [editMode, setEditMode] = useState(false);
    const [placement, setPlacement] = useState('bottomRight');
    const [activeKey, setActiveKey] = useState([]);
    const { me, setMe } = useContext(UserContext);

    const onChange = (checked) => {
        console.log(`switch to ${checked}`);
    };

    const initialValues = {
        name: me?.username,
        email: me?.mail,
        phone: me?.phone,
        jobTitle: me?.jobTitle
    };

    const onFinish = async (values) => {
        try {
            const response = await fetch(`http://localhost:8000/api/update/${me._id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    jobTitle: values?.jobTitle,
                    phone: values?.phone
                })
            });

            if (!response.ok) {
                throw new Error('Failed to update user data');
            }

            // If your server sends back data after updating, you might want to handle it here
            const responseData = await response.json();
            setMe(responseData)
            localStorage.setItem('userData', JSON.stringify(responseData));

            setEditMode(!editMode)

        } catch (error) {
            console.error('Error updating user data:', error);
            // Provide user feedback on error if needed
        }
    };

    const handleSave = () => {
        form.submit();
    };

    const handleModify = () => {
        setEditMode(true);
    };

    const handlePanelChange = (keys) => {
        setActiveKey(keys);
    };

    useEffect(() => {
        console.log('refresh data');
    }, [me])


    return (
        <>
            <Collapse
                accordion
                activeKey={activeKey}
                onChange={handlePanelChange}
            >
                <Panel header="Personal Info" key="1">
                    <Form
                        form={form}
                        labelCol={{
                            span: 6,
                        }}
                        wrapperCol={{
                            span: 12,
                        }}
                        initialValues={initialValues}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            label="name"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your name!',
                                },
                            ]}
                        >
                            <Input placeholder="Enter your name" disabled={!editMode} style={{ width: 150 }} />
                        </Form.Item>

                        <Form.Item
                            label="mail"
                            name="email"
                            rules={[
                                {
                                    required: false,
                                    message: 'Please input your email address!',
                                },
                            ]}
                        >
                            <Input placeholder="Enter your email" readOnly disabled={false} style={{ backgroundColor: '#d3d3d3', width: 150 }} />
                        </Form.Item>

                        <Form.Item
                            label="Tel"
                            name="phone"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your phone number!',
                                },
                            ]}
                        >
                            <Input placeholder="Enter your phone number" disabled={!editMode} style={{ width: 150 }} />
                        </Form.Item>

                        <Form.Item
                            label="Job"
                            name="jobTitle"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your JobTitle!',
                                },
                            ]}
                        >
                            <Input.TextArea
                                placeholder="jobTitle"
                                autoSize={{ minRows: 1, maxRows: 1 }} // Adjust the number of rows as needed
                                disabled={!editMode}
                            />
                        </Form.Item>

                        <Form.Item
                            wrapperCol={{
                                offset: 6,
                                span: 12,
                            }}
                        >
                            {!editMode && (
                                <Button type="primary" onClick={handleModify}>
                                    Modify
                                </Button>
                            )}
                            {editMode && (
                                <Button type="primary" onClick={handleSave}>
                                    Save
                                </Button>
                            )}
                        </Form.Item>

                    </Form>
                </Panel>
                <Panel header="Privacy" key="2">
                    <h5>Who can see my personal info</h5>
                    <div className='profil-photo flx'>
                        <p>Profile photo</p>
                        <Select size="small"
                            defaultValue="Everyone"
                            style={{
                                width: 120,
                            }}
                            placement={placement}
                            options={[
                                {
                                    value: 'Everyone',
                                    label: 'Everyone',
                                },
                                {
                                    value: 'Selected',
                                    label: 'Selected ',
                                },
                                {
                                    value: 'Nobody',
                                    label: 'Nobody',
                                },
                            ]}
                        />
                    </div>
                    <div className='profil-status flx'>
                        <p>Status</p>
                        <Select size="small"
                            defaultValue="Everyone"
                            style={{
                                width: 120,
                            }}
                            placement={placement}
                            options={[
                                {
                                    value: 'Everyone',
                                    label: 'Everyone',
                                },
                                {
                                    value: 'Selected',
                                    label: 'Selected ',
                                },
                                {
                                    value: 'Nobody',
                                    label: 'Nobody',
                                },
                            ]}
                        />
                    </div>
                    <div className='profile-group flx'>
                        <p>Groups</p>
                        <Select size="small"
                            defaultValue="Everyone"
                            style={{
                                width: 120,
                            }}
                            placement={placement}
                            options={[
                                {
                                    value: 'Everyone',
                                    label: 'Everyone',
                                },
                                {
                                    value: 'Selected',
                                    label: 'Selected ',
                                },
                                {
                                    value: 'Nobody',
                                    label: 'Nobody',
                                },
                            ]}
                        />
                    </div>
                    <div className='last-seen flx'>
                        <p>Last seen</p>
                        <Switch size='small' defaultChecked onChange={onChange} />
                    </div>
                    <div className='Read-receipts flx'>
                        <p>Read receipts</p>
                        <Switch size='small' defaultChecked onChange={onChange} />
                    </div>
                </Panel>
                <Panel header="Security" key="3">
                    <div className='security flx'>
                        <p>Show security notification</p>
                        <Switch size='small' defaultChecked onChange={onChange} />
                    </div>
                </Panel>
            </Collapse>
            <Collapse accordion>
                <Panel header="Help" key="4">
                    <div className='help-link'>
                        <p>FAQs</p>
                        <p>Contact</p>
                        <p>Terms & Privacy policy</p>
                    </div>                </Panel>
            </Collapse>
        </>
    );
};

export default MyForm;
