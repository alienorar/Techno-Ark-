// import React, { useState } from 'react';
import { Button, Form, Input, Typography } from 'antd';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { auth } from '@service';
import LoginImg from '../../assets/login-img.jpg';

const Index: React.FC = () => {
    const { Link } = Typography;
    const navigate = useNavigate();
    // const notify = (message) => toast.error(message);
    const onFinish = async (values: any): Promise<void> => {
        try {
            const response = await auth.sign_in(values);
            if (response.status === 201) {
                const access_token = response?.data?.data?.tokens?.access_token;
                const id = response?.data?.data?.data?.id
                localStorage.setItem("access_token", access_token);
                localStorage.setItem("id", id);
                navigate("/admin-panel");
            }
        } catch (error) {
            // notify("Phone number or password is wrong. Please try again.");
        }
    };

    return (
        <>
            {/* <ToastContainer /> */}
            <div className='grid grid-col-1 lg:grid-cols-2 items-center'>
                <div className='hidden lg:block w-full h-[100vh] bg-[#dad3d33f]'>
                    <img src={LoginImg} alt="login-img" className='w-full' />
                </div>
                <div className='flex justify-center items-center w-full p-6 pt-20'>
                    <Form
                        name="sign_in"
                        initialValues={{ remember: true }}
                        style={{
                            maxWidth: "600px",
                            width: "340px",
                            display: "flex",
                            flexDirection: "column",
                        }}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            label="Phone number"
                            name="phone_number"
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            style={{ marginBottom: '8px' }}
                            rules={[{ required: true, message: 'Please input phone number!' }]}
                        >
                            <Input style={{ height: "40px", }} status='error' className=' border-[1.5px]' />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            style={{ marginBottom: '8px' }}
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password style={{ height: "40px" }} status='error' className='border-[1.5px] ' />
                        </Form.Item>

                        <Form.Item>
                            <Button block htmlType="submit" style={{ backgroundColor: "#e35112", color: "white", height: "40px", fontSize: "18px", marginTop: "10px" }}>
                                Sign In
                            </Button>
                            <Typography style={{ marginTop: "10px" }}>
                                Don't you have an account?
                                <Link href="/" style={{ marginLeft: "10px", fontSize: "18px", fontFamily: "serif" }}>
                                    Sign Up
                                </Link>
                            </Typography>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </>
    );
};

export default Index;
