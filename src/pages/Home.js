import React from 'react'
import {
    Link
  } from "react-router-dom";
import { Space, Card, Row, Col } from 'antd';
import 'antd/dist/antd.css';
import '../index.css';

const Home = () => (
    <>
    <Row>
    <Col span={24}>
      <Space direction="horizontal">
        <Link to="/tramite">
        <Card title="Autorización de títulos" style={{ width: 300 }}>
          <p><img src="btn_registro_titulo.jpg" width="200" /></p>        </Card>
        </Link>
      </Space>
    </Col>
    </Row>
  </>
)

export default Home