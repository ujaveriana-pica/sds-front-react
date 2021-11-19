import React from 'react'
import {
    Link, useHistory
  } from "react-router-dom";
import { Space, Card, Row, Col, Form, Input, Button, message } from 'antd';
import 'antd/dist/antd.css';
import '../index.css';

const Login = () => {
    const onFinish = (values) => {
        const apiUrl = window.location.protocol + "//" + window.location.hostname + "/api";
        if(values.username && values.password) {
            fetch(apiUrl + '/auth/access-token', {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            }).then(function(response) {
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
            })
            .catch(function(error) {
                console.log('Hubo un problema con la petición Fetch:' + error.message);
            });

            
        }
        else {
            message.error("Usuario o password inválidos");
        }
    };

    return (
    <>
        <Row>
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
        <Row>
            <Col span={6}>
                Para realizar un trámite debe <Link to="/registro">registrarse</Link> como usuario sin ningun costo haciendo clic <Link to="/registro">aqui</Link>
            </Col>
        </Row>
    </>
    )
    
}

export default Login