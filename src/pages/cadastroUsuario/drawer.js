import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Modal, Form, Drawer } from "antd";
import CadastroUsuario from './manutencao';
import { CloseOutlined, SaveOutlined } from '@ant-design/icons';

export default function DrawerCadastroUsuario({ abrir, setAbrir, usuario, setUsuario }) {
    const [form] = Form.useForm();
    const [editando, setEditando] = useState(false);
    const [usuarioMnt, setUsuarioMnt] = useState(null);
    const [carregando, setCarregando] = useState(false);
    const onClose = () => {
        setAbrir(false);
        form.resetFields();
    }

    useEffect(() => {
        if (abrir) {
            if (usuario) {
                setEditando(true);
                setUsuarioMnt(usuario);
                setUsuario(null)
            } else {
                setEditando(false);
            }
        }
    }, [abrir])

    return (<Drawer title="Cadastro Usuario"
        width="70%"
        visible={abrir}
        onClose={onClose}
        footer={
            <div>
                <Row align="middle" justify="end" gutter={[8, 0]}>
                    <Col>
                        <Button onClick={onClose} icon={<CloseOutlined />} size="large" htmlType="button">
                            Cancelar
                        </Button>
                    </Col>
                    <Col>
                        <Button loading={carregando} onClick={() => form.submit()} icon={<SaveOutlined />} size="large" type="primary" htmlType="submit">
                            Salvar
                        </Button>
                    </Col>
                </Row>
            </div>
        }
    >
        <CadastroUsuario form={form} usuario={usuarioMnt} editando={editando} setEditando={setEditando} setCarregando={setCarregando}/>
    </Drawer>)
}
