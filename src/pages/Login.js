import React from 'react'
import {
    Link, useHistory
  } from "react-router-dom";
import { Space, Card, Row, Col, Form, Input, Button, message } from 'antd';
import 'antd/dist/antd.css';
import '../index.css';
import { RestClientPost } from '../clients/RestClient';

const Login = () => {
    const onFinish = (values) => {
        if(values.username && values.password) {
            RestClientPost('/identity-provider/api/auth/access-token', JSON.stringify(values),
                (response) => {
                    if(response.ok) {
                        response.json().then(data => {
                          localStorage.setItem('token', data.access_token);
                          window.location.replace("/");
                        });
                    } else if(response.status === 403) {
                        message.error("Usuario o password inválidos");
                        console.log(response);
                    } else {
                        message.error("Se ha presentado un error. Por favor intente nuevamente.");
                        console.log(response);
                    }
                },
                (error) => {
                    console.log('Hubo un problema con la petición Fetch:' + error.message);
                }
            );
        }
        else {
            message.error("Usuario o password inválidos");
        }
    };

    return (
    <>
        <Row justify="center">
            <Col span={32}><div><img src="alcaldiac_logo.png" /></div></Col>
        </Row>
        <Row justify="center">
            <Col span={32}>
                <Space direction="horizontal">
                    <Form
                        name="basic"
                        labelCol={{
                        span: 8,
                        }}
                        wrapperCol={{
                        span: 16,
                        }}
                        initialValues={{
                        remember: true,
                        }}
                        autoComplete="off"
                        onFinish={onFinish}
                    >
                        <Form.Item
                        label="Usuario"
                        name="username"
                        rules={[
                            {
                            required: true,
                            message: 'Por favor ingrese el nombre de usuario !',
                            },
                        ]}
                        >
                        <Input />
                        </Form.Item>

                        <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                            required: true,
                            message: 'Por favor ingrese la clave !',
                            },
                        ]}
                        >
                        <Input.Password />
                        </Form.Item>

                        <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                        >
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                        </Form.Item>
                    </Form>
                </Space>
            </Col>
        </Row>
        <Row justify="center">
            <Col span={32}>
                Para realizar un trámite debe <Link to="/registro">registrarse</Link> como usuario sin ningún costo haciendo clic <Link to="/registro">aqui</Link>
            </Col>
        </Row>
    </>
    )
    
}

export default Login