import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Card, Checkbox, Col, Form, Input, Layout, notification, Row, Select, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import { login, setEmpresa, setLocal, setNomeEmpresa } from '../../services/auth';

export default function Login() {

    const { Title } = Typography;
    const [form] = Form.useForm();
    const [etapa, setEtapa] = useState(0);
    const [listaEmpresa, setListaEmpresa] = useState([]);
    const [listaLocal, setListaLocal] = useState([]);
    const onFinish = (values) => {
        let dados = {};
        dados.emp_id = form.getFieldValue().empresa;
        dados.loc_id = form.getFieldValue().local;
        api.post("Local/GerarToken", JSON.stringify(dados)).then(
            res => {
                if (!!res.data) {
                    setEmpresa(dados.emp_id );
                    setLocal(dados.loc_id);
                    login(res.data);
                    setNomeEmpresa(listaEmpresa.find(e => e.emp_id == dados.emp_id).emp_nomefantasia);
                }
            }
        ).catch(
            err => {
                console.log(err);
            }
        ).finally(
            () => {
                window.location = '/Dashboard'
            }
        )
    };


    function fazerLogin() {
        let dados = {};
        dados.email = form.getFieldValue().usuario;
        dados.senha = btoa(form.getFieldValue().senha);
        debugger;
        api.post("Login/EfetuarLogin", JSON.stringify(dados)).then(
            res => {
                login(res.data);
                setEtapa(1);
                buscarEmpresa();
            }
        ).catch(
            err => {
                if (err.status == 401)
                    notification.warning({ message: "Usuario ou Senha Incorretos!" });
                else
                    notification.warning({ message: "Um erro inesperado aconteceu, tente novamente mais tarde!" });
            }
        );
    }

    function buscarEmpresa() {
        api.get("Empresa/Buscar").then(
            res => {
                if (!!res.data) {
                    setListaEmpresa(res.data);
                }
            }
        ).catch(
            err => {
                console.log(err);
            }
        )
    }

    function buscarLocal() {
        let empresa = form.getFieldValue().empresa;

        api.get(`Local/Buscar?empresa=${empresa}`).then(
            res => {
                if (!!res.data) {
                    setListaLocal(res.data);
                }
            }
        ).catch(
            err => {
                console.log(err);
            }
        )
    }

    return (
        <div className="login-container">
            <Form
                name="login"
                initialValues={{ remember: true }}
                onFinish={fazerLogin}
                layout='vertical'
                form={form}
            >
                {etapa == 0 &&
                    <Card className="login-card">
                        <Title level={2} className="login-title">Login</Title>

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

                    </Card>}
                {etapa == 1 &&
                    <Card className="login-card">
                        <Title level={2} className="login-title">Seleção de Empresa</Title>

                        <Form.Item
                            name="empresa"
                            label="Empresa"
                            rules={[{ required: true, message: 'Favor selecionar uma empresa!' }]}
                        >
                            <Select placeholder="Selecione a empresa" onChange={() => buscarLocal()} >
                                {listaEmpresa.map(emp => (
                                    <Select.Option key={emp.emp_id} value={emp.emp_id}>{emp.emp_nomefantasia}</Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="local"
                            label="Local"
                            rules={[{ required: true, message: 'Favor selecionar um local!' }]}
                        >
                            <Select placeholder="Selecione o local" onChange={() => onFinish()}>
                                {listaLocal.map(loc => (
                                    <Select.Option key={loc.loc_id} value={loc.loc_id}>{loc.loc_descricao}</Select.Option>
                                ))}
                            </Select>
                        </Form.Item>



                    </Card>
                }</Form>
        </div>
    );
};

