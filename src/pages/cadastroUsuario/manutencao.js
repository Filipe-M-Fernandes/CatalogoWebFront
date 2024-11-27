import React, { useEffect, useState } from 'react';
import { Form, Input, Checkbox, Upload, Button, Select, Switch, message, notification, } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Option } from 'antd/es/mentions';
import api from '../../services/api';

export default function CadastroUsuario({ form, usuario = null, editando = false, setEditando, setCarregando }) {
    const [fileList, setFileList] = useState([]);
    const handleFileChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };

    useEffect(() => {
        if (editando) {
            form.setFieldsValue(usuario);
        }
    }, [editando]);

    function incluirUsuario(usuario) {
        setCarregando(true);
        if (!editando) {
            api.post(`Usuario/Incluir`, usuario).then(
                res => {
                    notification.success({ message: "Usuário incluído com sucesso!", description: "Os dados do Usuário foram salvos com sucesso, um e-mail foi enviado para a definição de senha!" });
                    setTimeout(() => {
                        window.location = '/listausuarios';
                    }, 2500);
                }
            ).catch(
                err => {
                    console.log(err);
                }
            ).finally(
                () => {
                    setCarregando(false);
                }
            );
        } else {
            api.put('Usuario/Editar', usuario).then(
                res => {
                    notification.success({ message: "Usuário alterado com sucesso!" });
                    setTimeout(() => {
                        window.location = '/listausuarios';
                    }, 2500);
                }
            ).catch(
                err => {
                    console.log(err);
                }
            ).finally(
                () => {
                    setCarregando(false);
                }
            )
        }
    }

    function buscarUsuario() {
        let email = form.getFieldValue().usu_email;
        api.get(`Usuario/RetornaUsuarioEmail?email=${email}`).then(
            res => {
                if (!!res.data) {
                    setEditando(true);
                    form.setFieldsValue(res.data);
                } else {
                    setEditando(false);
                }
            }
        ).catch(
            erro => {
                console.log(erro);
            }
        )
    }

    return (
        <div style={{ maxWidth: 600, margin: "0 auto", padding: "20px" }}>
            <h2>Cadastro de Usuário</h2>
            <Form
                form={form}
                layout="vertical"
                onFinish={incluirUsuario}
                initialValues={{
                    ativo: true,
                    admin: false,
                }}
            >
                <Form.Item name="usu_id" hidden>
                </Form.Item>
                <Form.Item
                    label="Email"
                    name="usu_email"
                    rules={[
                        { required: true, message: "Por favor, insira o email" },
                        { type: "email", message: "Por favor, insira um email válido" },
                    ]}
                >
                    <Input placeholder="Digite o email" onBlur={() => buscarUsuario()} />
                </Form.Item>

                <Form.Item
                    label="Nome"
                    name="usu_nome"
                    rules={[{ required: true, message: "Por favor, insira o nome" }]}
                >
                    <Input placeholder="Digite o nome" />
                </Form.Item>

                <Form.Item
                    label="Avatar"
                    name="avatar"
                    valuePropName="fileList"
                    getValueFromEvent={(e) => e?.fileList}
                >
                    <Upload
                        listType="picture"
                        maxCount={1}
                        fileList={fileList}
                        onChange={handleFileChange}
                        beforeUpload={() => false}
                    >
                        <Button icon={<UploadOutlined />}>Upload Avatar</Button>
                    </Upload>
                </Form.Item>

                <Form.Item
                    initialValue={false}
                    label="Ativo"
                    name="usu_ativo"
                    hidden={!editando}
                    valuePropName="checked"
                >
                    <Switch />
                </Form.Item>

                <Form.Item

                    name="usu_admin"
                    valuePropName="checked"
                >
                    <Checkbox>Marcar como administrador</Checkbox>
                </Form.Item>
            </Form>
        </div>
    );
}