import { Card, Col, Input, Pagination, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import ModalDetalhes from './modalDetalhes';

export default function Produtos() {
    const { Search } = Input;
    const { Meta } = Card;
    const [lista, setLista] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const [totalItens, setTotalItens] = useState(0);
    const [abrirModal, setAbrirModal] = useState(false);
    const [dadosProduto, setDadosProduto] = useState({});
    const handleSearch = (value) => {
        console.log("Filtros " + value);
        buscarProdutos(value);
    };

    const handleChangePage = (page) => {
        setCurrentPage(page);
    };
    useEffect(() => {
        if (!!currentPage) {
            buscarProdutos();
        }
    }, [currentPage]);

    function buscarProdutos(filtro) {
        api.get(`Produto/Buscar?${!!filtro ? 'filtro=' + filtro + '&' : ''}PageNumber=${currentPage}&PageSize=${itemsPerPage}`).then(
            res => {
                setLista(res.data.items)
                setTotalItens(res.data.totalItems);
            }
        ).catch(
            err => {
                console.log(err);
            }
        )
    }

    function exibirProduto(item) {
        setDadosProduto(item);
        setAbrirModal(true);
        acessoProduto(item);
    }

    function acessoProduto(item) {
        api.post(`Acessos/AcessoProduto?ProId=${item.pro_id}`).then(res => {
            console.log("Produto " + item.pro_descricao + " acessado");
        }).then(err => {
            console.log(err);
        });
    }

    return (
        <div className="item-list-page">
            <div className="search-bar">
                <Search
                    placeholder="Filtrar itens"
                    onSearch={handleSearch}
                    enterButton
                    size="large"
                />
            </div>
            <main className="items-content">
                <div gutter={[16, 16]} className="items-grid">
                    {lista.map((item) => (

                        <Card
                            key={item.pro_id}
                            className="item-card"
                            hoverable
                            onClick={() => { exibirProduto(item) }}
                            cover={<img className="item-image" alt={item.pro_id} src={`data:image/jpg;base64,${item.imagem}`} />}
                        >
                            <Meta title={item.pro_descricao} description={item.pro_descricaoresumida} />
                        </Card>

                    ))}
                </div>
            </main>
            <Pagination
                className="pagination"
                current={currentPage}
                pageSize={itemsPerPage}
                total={totalItens}
                onChange={handleChangePage}
            />
            <ModalDetalhes open={abrirModal} setOpen={setAbrirModal} produto={dadosProduto} />
        </div>
    );
}