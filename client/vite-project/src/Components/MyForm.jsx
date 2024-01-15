import React, { useState } from 'react';
import { Form, Input, Button, Collapse } from 'antd';
import { Select, Switch } from 'antd';

const { Panel } = Collapse;

const MyForm = () => {
    const [form] = Form.useForm();
    const [editMode, setEditMode] = useState(false);
    const [placement, SetPlacement] = useState('bottomRight');

    const onChange = (checked) => {
        console.log(`switch to ${checked}`);
    };

    const initialValues = {
        name: 'Sacha Foucard',
        email: 'Sachafoucard8@gmail.com',
        phone: '123-456-7890',
        location: 'Ramat Gan, Israel',
        description: "A professional profile is an introductory section on your resume that highlights your relevant qualifications and skills."
    };

    const onFinish = (values) => {
        console.log('Received values:', values);
        // Handle form submission logic here
        // You can update the state, send data to the server, etc.
        setEditMode(false);
    };

    const handleSave = () => {
        form.submit();
    };

    const handleModify = () => {
        setEditMode(true);
    };

    return (
        <>
            <Collapse accordion>
                <Panel header="Personal Info" key="1" >
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
                            label="Name"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your name!',
                                },
                            ]}
                        >
                            <Input placeholder="Enter your name" disabled={!editMode} />
                        </Form.Item>

                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your email address!',
                                },
                            ]}
                        >
                            <Input placeholder="Enter your email" disabled={!editMode} />
                        </Form.Item>

                        <Form.Item
                            label="Phone No"
                            name="phone"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your phone number!',
                                },
                            ]}
                        >
                            <Input placeholder="Enter your phone number" disabled={!editMode} />
                        </Form.Item>

                        <Form.Item
                            label="Location"
                            name="location"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your location!',
                                },
                            ]}
                        >
                            <Input placeholder="Enter your location" disabled={!editMode} />
                        </Form.Item>
                        <Form.Item
                            label="Description"
                            name="description"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your description!',
                                },
                            ]}
                        >
                            <Input.TextArea
                                placeholder="Enter your description"
                                autoSize={{ minRows: 3, maxRows: 6 }} // Adjust the number of rows as needed
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
            </Collapse>
            <Collapse accordion>
                <Panel header="Privacy" key="2" >
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
            </Collapse>
            <Collapse accordion>
                <Panel header="Security" key="3" >
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
                    </div>
                </Panel>
            </Collapse>
        </>
    );
};

export default MyForm;
