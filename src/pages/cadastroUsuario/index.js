import React, { useEffect, useState } from 'react';
import { Form, Input, Checkbox, Upload, Button, Select, Switch, message, Table, Popconfirm, Space, Modal, } from "antd";
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined, PlusOutlined, UploadOutlined } from "@ant-design/icons";
import DrawerCadastroUsuario from './drawer';
import api from '../../services/api';

export default function ListaUsuarios({ form }) {
    const [abrirDrawer, setAbrirDrawer] = useState(false);
    const [totalItens, setTotalItens] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [listaUsuario, setListaUsuario] = useState([]);
    const [usuarioSelec, setUsuarioSelec] = useState(null);

    const handleAddUsuario = () => {
        setAbrirDrawer(true);
    };

    const handleEditUsuario = (usu) => {
        setUsuarioSelec(usu);
        setAbrirDrawer(true);
    };

    const handleDeleteUsuario = (usu) => {
        Modal.confirm({
            title: 'Excluir?',
            icon: <ExclamationCircleOutlined />,
            content: `Deseja realmente excluir o usuario ${usu.usu_nome}`,
            okText: 'Sim',
            cancelText: 'Não',
            centered: true,
            onOk() {
                deletarusuario(usu);
            }
        });
    };

    function deletarusuario(usu){

    }

    const columns = [
        {
            title: "Nome",
            dataIndex: "usu_nome",
            key: "usu_nome",
        },
        {
            title: "Email",
            dataIndex: "usu_email",
            key: "usu_email",
        },
        {
            title: "Ativo",
            dataIndex: "usu_ativo",
            key: "usu_ativo",
            render: (usu_ativo) => (usu_ativo ? "Sim" : "Não"),
        },
        {
            title: "Administrador",
            dataIndex: "usu_admin",
            key: "usu_admin",
            render: (usu_admin) => (usu_admin ? "Sim" : "Não"),
        },
        {
            title: "Ações",
            key: "acoes",
            render: (_, record) => (
                <Space>
                    <Button
                        type="primary"
                        icon={<EditOutlined />}
                        onClick={() => handleEditUsuario(record)}
                    >
                        Editar
                    </Button>
                    <Popconfirm
                        title="Tem certeza que deseja excluir este usuário?"
                        onConfirm={() => handleDeleteUsuario(record.key)}
                        okText="Sim"
                        cancelText="Não"
                    >
                        <Button type="danger" icon={<DeleteOutlined />}>
                            Excluir
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];
    const handleChangePage = (page) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        if (!!currentPage) {
            buscarUsuarios();
        }
    }, [currentPage]);

    function buscarUsuarios() {
        api.get(`Usuario/Buscar?PageNumber=${currentPage}&PageSize=${itemsPerPage}`).then(
            res => {
                setTotalItens(res.data.totalItems);
                setListaUsuario(res.data.items);
            }
        ).catch(
            err => {
                console.log(err);
            }
        );
    }

    return (
        <div>
            <div className="headerConteudo" >
                <div className="headerTitulo">
                    <h2>Lista de Usuários</h2>
                </div>
                <div className="headerBtn">
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={handleAddUsuario}
                    >
                        Adicionar Usuário
                    </Button>
                </div>
            </div>
            <div>
                <Table
                    columns={columns}
                    dataSource={listaUsuario}
                    size='small' scroll={{ x: 920 }} pagination={{
                        current: currentPage,
                        pageSize: itemsPerPage,
                        total: totalItens,
                        onChange: handleChangePage
                    }}
                />
                <DrawerCadastroUsuario abrir={abrirDrawer} setAbrir={setAbrirDrawer} usuario={usuarioSelec} setUsuario={setUsuarioSelec} />
            </div >
        </div>
    );
}