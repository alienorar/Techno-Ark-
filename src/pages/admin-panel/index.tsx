import { useState } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    LoginOutlined
} from '@ant-design/icons';
import { Button, Layout, Menu, Modal, theme } from 'antd';
import { NavLink, useLocation, Outlet, useNavigate } from 'react-router-dom';
import { adminRights } from '../../router/routes';
import MainLogo from '../../assets/texnoark-logo.svg';

const { Header, Sider, Content } = Layout;
const { Item } = Menu;

const App = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);
    const navigate = useNavigate();
    const { pathname } = useLocation();


    const handleLogout = () => {
        navigate('/sign-in');
        localStorage.removeItem("access_token")
    };


    const showLogoutModal = () => {
        setIsLogoutModalVisible(true);
    };


    const handleLogoutOk = () => {
        setIsLogoutModalVisible(false);
        handleLogout();
    };


    const handleLogoutCancel = () => {
        setIsLogoutModalVisible(false);
    };

    const {
        token: { colorBgContainer, borderRadiusLG, },
    } = theme.useToken();

    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed} width={260}>
                <div className="demo-logo-vertical" />
                <div className='flex p-4 gap-2 font-semibold mb-2'>
                    <img src={MainLogo} alt="main-logo" />
                    {
                        !collapsed && (<span className='text-[20px] text-[#fff] flex'>Techno Ark</span>)
                    }
                </div>
                <Menu theme="dark" mode="inline" selectedKeys={[pathname]}>
                    {adminRights?.map((item) => (
                        <Item key={item.path} icon={item.icon}>
                            <NavLink to={item.path} style={{ fontSize: '18px' }}>
                                {item.label}
                            </NavLink>
                        </Item>
                    ))}
                </Menu>
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer }}>
                    <div className='flex justify-between px-3 items-center'>
                        <Button
                            type="text"
                            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                            onClick={() => setCollapsed(!collapsed)}
                            style={{
                                fontSize: '16px',
                                width: 64,
                                height: 64,
                            }}
                        />
                        <Button
                            type="text"
                            onClick={showLogoutModal}
                            icon={<LoginOutlined />}
                            style={{
                                fontSize: '18px',
                                width: 84,
                                height: 44,
                                marginRight: 30,
                                fontFamily: 'monospace',
                            }}
                        >
                            Logout
                        </Button>
                    </div>
                </Header>
                <Content
                    style={{
                        margin: '0 16px',
                        minHeight: '100vh',
                        // background: darkDangerItemActiveBg,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>


            <Modal
                title="Confirm Logout"
                open={isLogoutModalVisible}
                onOk={handleLogoutOk}
                onCancel={handleLogoutCancel}
                okText="Logout"
                cancelText="Cancel"
                okButtonProps={{
                    style: { backgroundColor: 'orangered', borderColor: 'orangered', color: '#fff', marginLeft: 10, padding: 4 },
                }}
            >
                <p>Are you sure you want to log out?</p>
            </Modal>

        </Layout>
    );
};

export default App;
