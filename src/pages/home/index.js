import { Col, Layout, Row } from 'antd';
import React, { useEffect, useState } from 'react';


export default function Home() {

    return (
        <Layout>
            <Layout.Content>
                <Row justify="center" >
                    <Col span={16}>
                        Home

                    </Col>
                </Row>
            </Layout.Content>
        </Layout>
    );
}
