import { Card, Col, Input, Pagination, Row } from 'antd';
import React, { useEffect, useState } from 'react';

export default function Produtos() {
    const { Search } = Input;
    const { Meta } = Card;
    const [lista, setLista] = useState([
        { id: 1, title: 'Item 1', description: 'Descrição do item 1', image: 'https://via.placeholder.com/150' },
        { id: 2, title: 'Item 2', description: 'Descrição do item 2', image: 'https://via.placeholder.com/150' },
        { id: 3, title: 'Item 3', description: 'Descrição do item 3', image: 'https://via.placeholder.com/150' },

        { id: 21, title: 'Item 21', description: 'Descrição do item 21', image: 'https://via.placeholder.com/150' },
    ]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const handleSearch = (value) => {
        const filtered = lista.filter((item) =>
            item.title.toLowerCase().includes(value.toLowerCase()) ||
            item.description.toLowerCase().includes(value.toLowerCase())
        );
        setLista(filtered);
        setCurrentPage(1); // Resetar para a primeira página após a pesquisa
    };

    const handleChangePage = (page) => {
        setCurrentPage(page);
    };
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

            <Row gutter={[16, 16]} className="items-grid">
                {lista.map((item) => (
                    <Col xs={12} sm={8} md={8} lg={6} key={item.id}>
                        <Card
                            hoverable
                            cover={<img alt={item.title} src={item.image} />}
                        >
                            <Meta title={item.title} description={item.description} />
                        </Card>
                    </Col>
                ))}
            </Row>

            <Pagination
                className="pagination"
                current={currentPage}
                pageSize={itemsPerPage}
                total={100}
                onChange={handleChangePage}
            />
        </div>
    );
}