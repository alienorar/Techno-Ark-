// NotFound.js
// import React from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <Result
            status="404"
            title="404"
            subTitle="Sorry, the page you are looking for does not exist."
            extra={<Button type="primary" style={{ backgroundColor: "orangered" }} onClick={() => navigate('/admin-panel')}>Back to Home</Button>}
        />
    );
};

export default NotFound;
