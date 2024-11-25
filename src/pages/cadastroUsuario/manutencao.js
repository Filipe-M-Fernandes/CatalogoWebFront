import React, { useEffect, useState } from 'react';
import { Form, Input, Checkbox, Upload, Button, Select, Switch, message, } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Option } from 'antd/es/mentions';
import api from '../../services/api';

export default function CadastroUsuario({ form, usuario = null, editando = false }) {
    const [fileList, setFileList] = useState([]);

    const handleFinish = (values) => {
        console.log("Form values:", values);
        message.success("Usuário cadastrado com sucesso!");
    };

    const handleFileChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };

    useEffect(() => {
        if (editando) {
            form.setFieldsValue(usuario);
        }
    }, [editando]);

    return (
        <div style={{ maxWidth: 600, margin: "0 auto", padding: "20px" }}>
            <h2>Cadastro de Usuário</h2>
            <Form
                form={form}
                layout="vertical"
                onFinish={handleFinish}
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
                    <Input placeholder="Digite o email" />
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
                    label="Ativo"
                    name="usu_ativo"
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