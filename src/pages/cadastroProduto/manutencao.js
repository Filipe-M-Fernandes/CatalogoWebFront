import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Tabs, Select, Upload, InputNumber, Checkbox, Row, Col, Table, Tag, Space, Popconfirm } from 'antd';
import { PlusCircleOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import api from '../../services/api';
import { FormatValor } from '../../helpers';
import { render } from '@testing-library/react';

export default function CadastroProduto({ form, produto, editando }) {
    const { TabPane } = Tabs;
    const { TextArea } = Input;
    const [grades, setGrades] = useState([]);
    const [precos, setPrecos] = useState([]);
    const [listaGrupo, setListaGrupo] = useState([]);
    const [listaSubGrupo, setListaSubGrupo] = useState([]);
    const [listaGrade, setListaGrade] = useState([]);
    const [listaPreco, setListaPreco] = useState([]);
    const [listaTabelaPreco, setListaTabelaPreco] = useState([]);
    const [usaGrade, setUsaGrade] = useState(false);
    const [listaUnidadeMedida, setListaUnidadeMedida] = useState([]);
    const handleAddGrade = () => {
        setGrades([...grades, { description: '', ean: '' }]);
    };

    const handleAddPrice = () => {
        setPrecos([...precos, { priceTable: '', value: '', promotion: false, main: false }]);
    };

    useEffect(() => {
        buscarGrupos();
        buscarSubgrupo();
        buscarUnidadeMedida();
        buscarListaPreco();
    }, []);

    useEffect(() => {
        if (editando) {
            form.setFieldsValue(produto);
            buscarGrades(produto.pro_id);
            buscarPreco(produto.pro_id);
        }
    }, [editando]);

    function buscarGrupos() {
        api.get("Grupo/Buscar").then(
            res => {
                setListaGrupo(res.data.items);
            }
        ).catch(err => {
            console.log(err);
        })
    }

    function buscarSubgrupo() {
        api.get("SubGrupo/Buscar").then(
            res => {
                setListaSubGrupo(res.data.items);
            }
        ).catch(err => {
            console.log(err);
        })
    }

    function buscarGrades(id) {
        api.get(`ProdutoGrade/BuscarGradesProdutos?produtoId=${id}`).then(
            res => {
                if (res.data.length > 0) {
                    setListaGrade(res.data);
                    form.setFieldsValue({ pro_usagrade: true });
                    setUsaGrade(true);
                }
            }
        ).catch(err => {
            console.log(err);
        });
    }

    function buscarListaPreco() {
        api.get("ListaPreco/Listar").then(
            res => {
                setListaTabelaPreco(res.data);
            }
        ).catch(
            err => {
                console.log(err);
            }
        );
    }

    function buscarUnidadeMedida() {
        api.get("UnidadeMedida/Buscar").then(
            res => {
                setListaUnidadeMedida(res.data);
            }
        ).catch(
            err => {
                console.log(err);
            }
        )
    }

    function buscarPreco(proId) {
        api.get(`ListaPrecoItem/Buscar?proId=${proId}`).then(
            res => {
                setListaPreco(res.data);
            }
        ).catch(
            err => {
                console.log(err);
            }
        )
    }

    function excluirPreco(item) {

    }

    return (
        <Form layout="vertical" form={form}>
            <Tabs defaultActiveKey="1">
                <TabPane tab="Cadastro Geral" key="1">
                    <Form.Item name="pro_id" hidden>

                    </Form.Item>
                    <Row gutter={[8, 0]}>
                        <Col span={4}>
                            <Form.Item label="Código" name="pro_codigo">
                                <Input placeholder='Informe o código' />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Descrição" name="pro_descricao" rules={[{ required: true, message: 'Insira a descrição!' }]}>
                                <Input placeholder='Informe a descrição' />
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            <Form.Item label="Referência" name="pro_referencia">
                                <Input placeholder='Infore a referência' />
                            </Form.Item>
                        </Col>
                        <Col span={4}>
                            <Form.Item label="Imagem" name="imagem">
                                <Upload>
                                    <Button icon={<UploadOutlined />}>Upload</Button>
                                </Upload>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={[8, 0]}>
                        <Col span={6}>
                            <Form.Item label="EAN" name="pro_ean">
                                <Input placeholder='Informe o EAN' />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label="Peso Bruto" name="pro_pesobruto">
                                <InputNumber placeholder='Informe o peso bruto' min={0} style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label="Peso Líquido" name="pro_pesoliquido">
                                <InputNumber placeholder='Informe o peso líquido' min={0} style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item label="Estoque" name="stock">
                                <InputNumber placeholder='Informe o estoque' min={0} style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={[8, 0]}>
                        <Col span={4}>
                            <Form.Item label="Unidade de Medida" name="ump_id">
                                <Select placeholder='Selecione a unidade de medida'>
                                    {listaUnidadeMedida.map(un =>
                                        <Select.Option value={un.ump_id}>{un.ump_descricao}</Select.Option>
                                    )}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Grupo" name="gru_id">
                                <Select placeholder='Selecione o grupo'>
                                    {listaGrupo.map(g =>
                                        (<Select.Option key={g.gru_id} value={g.gru_id}>{g.gru_nome}</Select.Option>)
                                    )}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="Subgrupo" name="sgp_id">
                                <Select placeholder='Selecione o subgrupo'>
                                    {listaSubGrupo.map(s =>
                                    (
                                        <Select.Option key={s.sgp_id} value={s.sgp_id}>{s.sgp_nome}</Select.Option>
                                    )
                                    )}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={4} style={{ alignContent: 'end' }} >
                            <Form.Item name="pro_usagrade" valuePropName="checked" >
                                <Checkbox onChange={() => { setUsaGrade(!usaGrade) }}>Usa Grade</Checkbox>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={[8, 0]}>
                        <Col span={24}>
                            <Form.Item label="Observação" name="pro_observacao">
                                <TextArea placeholder='Informe a observação' rows={3} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={[8, 8]}>
                        <Col span={24}>
                            <Form.Item label="Descrição Detalhada" name="pro_descricaodetalhada">
                                <TextArea placeholder='Informe a descrição detalhada' rows={4} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={[8, 8]}>
                        <Col span={24}>
                            <Form.Item label="Descrição Resumida" name="pro_descricaoresumida">
                                <TextArea placeholder='Informe a descrição resumida' rows={2} />
                            </Form.Item>
                        </Col>
                    </Row>

                </TabPane>
                {usaGrade && <TabPane tab="Grades" key="2">


                    <div style={{ marginBottom: 16 }}>
                        <Row gutter={[8, 0]} align="middle">
                            <Col span={8}>
                                <Form.Item label={`Descrição Grade `} name={`gradeDescription`}>
                                    <Input placeholder='Informe a descrição' />
                                </Form.Item></Col>
                            <Col span={8}>
                                <Form.Item label={`EAN Grade`} name={`gradeEan`}>
                                    <Input placeholder='Informe o ean' />
                                </Form.Item>
                            </Col>
                            <Col>
                                <Button type='primary'> Adicionar</Button>
                            </Col>
                        </Row>
                    </div>
                    {listaGrade.length > 0 && <Table columns={[
                        {
                            title: 'EAN',
                            dataIndex: 'prg_ean',
                            key: 'prg_ean'
                        }, {
                            title: 'Descrição',
                            dataIndex: 'prg_descricao',
                            key: 'prg_descricao'
                        }, {
                            title: 'Ativo',
                            render: (prg) => (
                                <Tag.CheckableTag checked={prg.prg_ativa}>{prg.prg_ativa? "Sim": "Não"}</Tag.CheckableTag>
                            )
                        }]} dataSource={listaGrade} />
                    }
                </TabPane>}
                <TabPane tab="Preços" key="3">
                    <div style={{ marginBottom: 16 }}>
                        <Row gutter={[8, 0]} align="middle">
                            <Col span={8}>
                                <Form.Item label={`Tabela de Preço`} name={`ltp_id`}>
                                    <Select placeholder="Selecione a tabela de preço">
                                        {listaTabelaPreco.map(ltp => (
                                            <Select.Option value={ltp.ltp_id}>{ltp.ltp_nome}</Select.Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={4}>
                                <Form.Item label={`Valor`} name={`lpi_valorvenda`}>
                                    <InputNumber placeholder='Informe o valor' min={0} style={{ width: '100%' }} />
                                </Form.Item>
                            </Col>
                            <Col >
                                <Button onClick={handleAddPrice} type="primary" icon={<PlusOutlined />}>
                                    Adicionar Preço
                                </Button>
                            </Col>
                        </Row>
                    </div>


                    <Table columns={[
                        {
                            title: 'Tabela de Preço',
                            render: (e) => (
                                e.listapreco.ltp_nome
                            )
                        }, {
                            title: 'Valor',
                            render: (e) => (
                                FormatValor(e.lpi_valorvenda, true, true, 3)
                            ),
                        }, {
                            title: 'Principal',
                            render: (e) => (
                                e.listapreco.ltp_principal ? "Sim" : "Não"
                            )
                        }, {
                            title: 'Ativo',
                            render: (e) => (
                                e.listapreco.ltp_ativa ? "Sim" : "Não"
                            )
                        }, {
                            title: 'Promoção',
                            render: (e) => (
                                e.listapreco.ltp_promocao ? "Sim" : "Não"
                            )
                        }, {
                            title: 'Ações',
                            key: 'actions',
                            render: (_, record) => (
                                <Space>
                                    <Popconfirm
                                        title="Tem certeza que deseja excluir?"
                                        onConfirm={() => excluirPreco(record)}
                                        okText="Sim"
                                        cancelText="Não"
                                    >
                                        <Button type="primary">Excluir</Button>
                                    </Popconfirm>
                                </Space>
                            ),
                        }
                    ]} dataSource={listaPreco} />

                </TabPane>
            </Tabs>
        </Form>
    );
}