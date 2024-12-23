import React, { useEffect, useState } from "react";
import { Modal, Button, Input, Typography, Divider, Image, Popconfirm } from "antd";
import { FormatValor } from "../../helpers";

export default function ModalDetalhes({ open, setOpen, produto = {} }) {
    const { Title, Text } = Typography;
    const [possuiDesc, setPossuiDesc] = useState(false);

    useEffect(() => {
        if (!!produto?.pro_id) {
            setPossuiDesc(!!produto.valorPromocao);
        }
    }, [produto])

    function solicitarEstoque() {

    }
    return (
        <Modal
            title={`${produto.pro_codigo} - ${produto.pro_descricao}`}
            open={open}
            onOk={() => setOpen(false)}
            onCancel={() => setOpen(false)}
            width={800}
        >
            <div style={{ display: "flex", gap: "20px" }}>
                <Image
                    src={`data:image/jpg;base64,${produto.imagem}`}
                    alt={produto.pro_descricao}

                    style={{ objectFit: "cover", borderRadius: "8px" }}
                />
                <div>
                    <Title level={4}>{produto.pro_descricao}</Title>
                    <Text strong>Preço: </Text>
                    {possuiDesc && <Text delete>{FormatValor(produto.valorvenda, true, true)}</Text>}
                    {!possuiDesc && <Text strong>{FormatValor(produto.valorvenda, true, true)}</Text>}
                    {possuiDesc && <Text style={{ color: "red", marginLeft: "10px" }}>
                        {FormatValor(produto.valorPromocao, true, true)}
                    </Text>}
                    <Text strong style={{ marginLeft: "10px" }}>Estoque: </Text>
                    {produto.estoque > 0 ? <Text > {FormatValor(produto.estoque, true, false, 2)} </Text> : <Popconfirm
                        title="Solicitar Estoque?"
                        onConfirm={() => solicitarEstoque(produto)}
                        okText="Sim"
                        cancelText="Não"
                    >
                        <Text style={{ cursor: "pointer" }}> Sem Estoque </Text>
                    </Popconfirm>}
                    <Divider />
                    <Text strong>Descrição: </Text>
                    <Text>{produto.pro_descricaodetalhada}</Text>
                    <Divider />
                    <Text strong>Observação: </Text>
                    <Text>{produto.pro_observacao ?? "Não há observação"}</Text>
                    <Divider />
                    <Text strong>Referência: </Text>
                    <Text>{produto.pro_referencia}</Text>
                </div>
            </div>
        </Modal>
    );
}