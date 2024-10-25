import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Card, Checkbox, Col, Form, Input, Layout, Row, Select, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import api from '../../services/api';

export default function Login() {

    const { Title } = Typography;
    const [etapa, setEtapa] = useState(0);
    const [listaEmpresa, setListaEmpresa] = useState([]);
    const [listaLocal, setListaLocal] = useState([]);
    const onFinish = (values) => {
        console.log('Success:', values);
        setEtapa(1);
        fazerLogin();
    };

    function fazerLogin() {
        api.post("").then(res => {

        }).catch(
            err => {

            }
        );
    }

    return (
        <div className="login-container">
            {etapa == 0 &&
                <Card className="login-card">
                    <Title level={2} className="login-title">Login</Title>
                    <Form
                        name="login"
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        layout='vertical'
                    >
                        <Form.Item
                            name="usuario"
                            label="Usuario"
                            rules={[{ required: true, message: 'Favor informar o usuario!' }]}
                        >
                            <Input
                                prefix={<UserOutlined className="site-form-item-icon" />}
                                placeholder="Usuario"
                            />
                        </Form.Item>

                        <Form.Item
                            name="senha"
                            label="Senha"
                            rules={[{ required: true, message: 'Favor informar a senha!' }]}
                        >
                            <Input.Password
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                placeholder="Senha"
                            />
                        </Form.Item>

                        <Form.Item>
                            <Form.Item name="remember" valuePropName="checked" noStyle>
                                <Checkbox>lembrar</Checkbox>
                            </Form.Item>

                            <a className="login-form-forgot" href="/">
                                Esqueceu a senha?
                            </a>
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Log in
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>}
            {etapa == 1 &&
                <Card className="login-card">
                    <Title level={2} className="login-title">Seleção de Empresa</Title>
                    <Form
                        name="empresa"
                        initialValues={{ remember: true }}
                        layout='vertical'
                        onFinish={onFinish}
                    >
                        <Form.Item
                            name="empresa"
                            label="Empresa"
                            rules={[{ required: true, message: 'Favor selecionar uma empresa!' }]}
                        >
                            <Select placeholder="Selecione a empresa">
                                {listaEmpresa.forEach(emp => (
                                    <Select.Option></Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="local"
                            label="Local"
                            rules={[{ required: true, message: 'Favor selecionar um local!' }]}
                        >
                            <Select placeholder="Selecione o local">
                            </Select>
                        </Form.Item>


                    </Form>
                </Card>
            }
        </div>
    );
};

