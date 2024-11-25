import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Modal, Form, Drawer } from "antd";
import CadastroProduto from './manutencao';
import { CloseOutlined, SaveOutlined } from '@ant-design/icons';

export default function DrawerCadastroProduto({ abrir, setAbrir, produto, setProduto }) {
    const [form] = Form.useForm();
    const [produtoMnt, setProdutoMnt] = useState(null);
    const [editando, setEditando] = useState(false);
    const onClose = () => {
        setAbrir(false);
        form.resetFields();
    }

    useEffect(() => {
        if (abrir) {
            if (produto) {
                setEditando(true);
                setProdutoMnt(produto);
                setProduto(null)
            } else {
                setEditando(false);
            }
        }
    }, [abrir])

    return (

        <Drawer title="Cadastro Produtos"
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
                            <Button onClick={() => form.submit()} icon={<SaveOutlined />} size="large" type="primary" htmlType="submit">
                                Salvar
                            </Button>
                        </Col>
                    </Row>
                </div>
            }
        >
            <CadastroProduto form={form} produto={produtoMnt} editando={editando} />
        </Drawer>
    )

}