// import React from 'react';
// import axios from 'axios'
import { Button, Form, Input, Typography } from 'antd';
import LoginImg from '../../assets/login-img.jpg';
import { useNavigate } from 'react-router-dom';
import { auth } from '@service';
const Index: React.FC = () => {
    const {Link } = Typography;
    const navigate = useNavigate()
    const onFinish = async (values:any):Promise<void> => {
        console.log('Received values of form: ', values);
        try {
            const response = await auth.sign_up(values)
            if (response.status = 201) {
                navigate("/sign-in")
            }
        } catch (error) {


        }
    };

    return (
        <>
            <div className='grid grid-col-1 lg:grid-cols-2 items-center'>
                <div className='hidden lg:block w-full h-full bg-[#dad3d33f]'>
                    <img src={LoginImg} alt="login-img" className='w-full' />
                </div>
                <div className='flex justify-center items-center w-full p-6 pt-20'>
                    {
                        <Form
                            name="sign_up"
                            initialValues={{
                                remember: true,
                            }}
                            style={{
                                maxWidth: "600px",
                                width: "70%",
                                display: "flex",
                                flexDirection: "column",

                            }}
                            onFinish={onFinish}
                        >
                            <div>
                                <Form.Item
                                    label="First name"
                                    name="first_name"
                                    labelCol={{ span: 24 }}
                                    wrapperCol={{ span: 24 }}
                                    style={{ marginBottom: '8px' }}
                                    className="custom-form-item"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your first name!',
                                        },
                                    ]}
                                >
                                    <Input style={{ height: "40px" }} className='border-[1.5px]' />
                                </Form.Item>
                            </div>
                            <div>
                                <Form.Item
                                    label="Last name"
                                    name="last_name"
                                    labelCol={{ span: 24 }}
                                    wrapperCol={{ span: 24 }}
                                    style={{ marginBottom: '8px' }}

                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your last name!',
                                        },
                                    ]}
                                >
                                    <Input style={{ height: "40px" }} className='border-[1.5px]' />
                                </Form.Item>
                            </div>
                            <div>
                                <Form.Item
                                    label="Phone number"
                                    name="phone_number"
                                    labelCol={{ span: 24 }}
                                    wrapperCol={{ span: 24 }}
                                    style={{ marginBottom: '8px' }}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input phone number!',
                                        },
                                    ]}
                                >
                                    <Input style={{ height: "40px" }} className='border-[1.5px]' />
                                </Form.Item>
                            </div>
                            <div>
                                <Form.Item
                                    label="Email"
                                    name="email"
                                    labelCol={{ span: 24 }}
                                    wrapperCol={{ span: 24 }}
                                    style={{ marginBottom: '8px' }}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input email!',
                                        },
                                    ]}
                                >
                                    <Input style={{ height: "40px" }} className='border-[1.5px]' />
                                </Form.Item>
                            </div>
                            <div>
                                <Form.Item
                                    label="Password"
                                    name="password"
                                    labelCol={{ span: 24 }}
                                    // labelRow={{ span: 10 }}
                                    wrapperCol={{ span: 24 }}
                                    style={{ marginBottom: '8px' }}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your password!',
                                        },
                                    ]}
                                >
                                    <Input.Password style={{ height: "40px" }} className='border-[1.5px]' />
                                </Form.Item>
                            </div>


                            <Form.Item>
                                <Button block  htmlType="submit" style={{ backgroundColor: "#e35112", color: "white", height: "40px", fontSize: "18px", marginTop: "10px" }}>
                                    Sign up
                                </Button>
                                <Typography   style={{ marginTop: "10px", }} />
                                Already have an account?
                                <Link href="./sign-in" style={{ marginLeft: "10px", fontSize: "18px", fontFamily: "serif" }}>
                                    Sign In
                                </Link>
                            </Form.Item>
                        </Form>
                    }
                </div>
            </div>
        </>
    );
};

export default Index;
