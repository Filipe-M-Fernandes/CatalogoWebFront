import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Col, Dropdown, Layout, Menu, Row, Space, Typography } from 'antd';

import React, { useEffect, useState } from 'react';
import { Produtos, Dashboard, ListaProdutos, ListaUsuarios } from '../';
import { Link, Route, Routes } from 'react-router-dom';
import { getMenuAberto, setMenuAberto } from '../../services/auth';


export default function Inicial() {
    const [selectedMenu, setSelectedMenu] = useState('');
    const { Header, Content } = Layout;
    const { Title } = Typography;

    const handleMenuClick = ({ key }) => {
        setSelectedMenu(key);
        setMenuAberto(key);
    };

    useEffect(() => {
        let menu = getMenuAberto();
        setSelectedMenu(menu);
    }, [])

    const userMenu = (
        <Menu>
            <Menu.Item key="settings" icon={<SettingOutlined />}>
                Configurações
            </Menu.Item>
            <Menu.Item key="logout" icon={<LogoutOutlined />}>
                Sair
            </Menu.Item>
        </Menu>
    );
    return (
        <Layout className="layout">
            <Header className="header">
                <div className="logo">MyLogo</div>
                <div className="user-avatar">
                    <Dropdown overlay={userMenu} trigger={['click']}>
                        <Space>
                            <Avatar icon={<UserOutlined />} />
                        </Space>
                    </Dropdown>
                </div>
            </Header>

            <Menu
                mode="horizontal"
                selectedKeys={[selectedMenu]}
                onClick={handleMenuClick}
                className="menu"
            >
                <Menu.Item key="dashboard"><Link to="/dashboard">Início</Link></Menu.Item>
                <Menu.Item key="produtos"><Link to="/produtos">Produtos</Link></Menu.Item>
                <Menu.SubMenu key="3" title="Cadastros">
                    <Menu.Item key="service1"><Link to="/listaprodutos">Produtos</Link></Menu.Item>
                    <Menu.Item key="service2"><Link to="/listausuarios">Usuarios</Link></Menu.Item>
                </Menu.SubMenu>
            </Menu>

            <Content className="content">
                <Routes>
                    <Route path="/produtos" element={<Produtos />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/listaprodutos" element={<ListaProdutos />} />
                    <Route path="/listausuarios" element={<ListaUsuarios />} />
                </Routes>

            </Content>

        </Layout>
    );
}
