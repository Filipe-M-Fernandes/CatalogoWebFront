import { Button, message, Pagination, Popconfirm, Space, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import CadastroProduto from './manutencao';
import DrawerCadastroProduto from './drawer';
import api from '../../services/api';
import { PlusOutlined } from '@ant-design/icons';

export default function ListaProdutos() {
    const [abrir, setAbrir] = useState(false);
    const [totalItens, setTotalItens] = useState(0);
    const [listaProduto, setListaProduto] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [produtoSelec, setProdutoSelec] = useState(null)

    const handleAdd = () => {
        setAbrir(true);
    };

    const handleEdit = (pro) => {
        setProdutoSelec(pro);
        setAbrir(true);
    };

    const handleDelete = (pro) => {

    };

    const handleChangePage = (page) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        if (!!currentPage) {
            buscarProdutos();
        }
    }, [currentPage]);


    function buscarProdutos() {
        api.get(`Produto/Buscar?PageNumber=${currentPage}&PageSize=${itemsPerPage}`).then(
            res => {
                setTotalItens(res.data.totalItems)
                setListaProduto(res.data.items);
            }
        ).catch(
            err => {
                console.log(err);
            }
        )
    }

    const columns = [
        {
            title: 'Código',
            dataIndex: 'pro_codigo',
            key: 'pro_codigo'
        },
        {
            title: 'Descrição',
            dataIndex: 'pro_descricao',
            key: 'pro_descricao'
        },
        {
            title: 'EAN',
            dataIndex: 'pro_ean',
            key: 'pro_ean'
        },
        {
            title: 'Grupo',
            dataIndex: 'gru_nome',
            key: 'gru_nome'
        },
        {
            title: 'Sub Grupo',
            dataIndex: 'sgp_nome',
            key: 'sgp_nome'
        },
        {
            title: 'Ações',
            key: 'actions',
            render: (_, record) => (
                <Space>
                    <Button type="primary" onClick={() => handleEdit(record)}>
                        Editar
                    </Button>
                    <Popconfirm
                        title="Tem certeza que deseja excluir?"
                        onConfirm={() => handleDelete(record)}
                        okText="Sim"
                        cancelText="Não"
                    >
                        <Button type="danger">Excluir</Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <div>
            <div className="headerConteudo" >
                <div className="headerTitulo">
                    <h2>Lista de Produtos</h2>
                </div>
                <div
                    className="headerBtn"
                >
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={handleAdd}
                    >
                        Adicionar Produto
                    </Button>
                </div>
            </div>


            <Table className='tabela' columns={columns} dataSource={listaProduto} size='small' scroll={{ x: 920 }} pagination={{
                current: currentPage,
                pageSize: itemsPerPage,
                total: totalItens,
                onChange: handleChangePage
            }} />


            <DrawerCadastroProduto abrir={abrir} setAbrir={setAbrir} produto={produtoSelec} setProduto={setProdutoSelec} />
        </div>
    );
}