import React, { useEffect, useState } from 'react';
import { Column, Pie } from '@ant-design/charts';
import api from '../../services/api';

export default function Dashboard() {
    const [listaProdutos, setListaProdutos] = useState([]);
    const [listaGrupo, setListaGrupo] = useState([]);
  

    const columnConfig = {
        data: listaProdutos,
        xField: 'descricao',
        yField: 'acessos',  
        color: '#40a9ff', // Azul claro
    };

    const pieConfig = {
        appendPadding: 10,
        data: listaGrupo,
        angleField: 'acessos',
        colorField: 'descricao',
        radius: 1,
        interactions: [{ type: 'element-active' }],
    };

    useEffect(() => {
        carregarDados();
    }, []);

    function carregarDados() {
        api.get("Acessos/Buscar").then(
            res => {
                setListaGrupo(res.data?.listaGrupos);
                setListaProdutos(res.data?.listaProdutos);
            }
        ).catch(
            err => {
                console.log(err);
            }
        )
    }
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '20px', width: '100%' }}>
            <div style={{ flex: 1, minWidth: '48%' }}>
                <h3 style={{ textAlign: 'center' }}>Produtos Mais Acessados</h3>
                <Column {...columnConfig} />
            </div>
            <div style={{ flex: 1, minWidth: '48%' }}>
                <h3 style={{ textAlign: 'center' }}>Grupos de Produtos Mais Acessados</h3>
                <Pie {...pieConfig} />
            </div>
        </div>
    );
}