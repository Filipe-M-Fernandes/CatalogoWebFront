import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Col, Dropdown, Layout, Menu, Row, Space, Typography } from 'antd';

import React, { useEffect, useState } from 'react';
export default function Inicial() {
    const [selectedMenu, setSelectedMenu] = useState('home');
    const { Header, Content } = Layout;
    const { Title } = Typography;

    const handleMenuClick = ({ key }) => {
        setSelectedMenu(key);
    };

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
                <Menu.Item key="home">Início</Menu.Item>
                <Menu.SubMenu key="products" title="Produtos">
                    <Menu.Item key="product1">Produto 1</Menu.Item>
                    <Menu.Item key="product2">Produto 2</Menu.Item>
                    <Menu.Item key="product3">Produto 3</Menu.Item>
                </Menu.SubMenu>
                <Menu.SubMenu key="services" title="Serviços">
                    <Menu.Item key="service1">Serviço 1</Menu.Item>
                    <Menu.Item key="service2">Serviço 2</Menu.Item>
                </Menu.SubMenu>
            </Menu>

            <Content className="content">
                <Title level={2}>Bem-vindo à Página Inicial</Title>
                <p>Conteúdo da página vai aqui.</p>
            </Content>
        </Layout>
    );
}
