import { React, useState} from 'react';
import 'antd/dist/antd.css';
import '../index.css';
import { Form, Input, Button, Divider, message, Row, Col } from 'antd';
import { RestClientPost } from '../clients/RestClient';

const layout = {
  labelCol: {
    span: 10,
  },
  wrapperCol: {
    span: 14,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 6,
    span: 32,
  },
};

const Tramite = () => {
  const [form] = Form.useForm();
  const [disabledRegistrarse, setDisabledRegistrarse] = useState(false);

  const onFinish = (values) => {
    console.log(values);
    if(values.password === values.password2) {
        setDisabledRegistrarse(true);
        values.status = "ACTIVE";
        values.rol = "CIUDADANO"
        RestClientPost('/identity-provider/api/user/sign-up', JSON.stringify(values),
            (response) => {
              if(response.ok) {
                response.json().then(data => {
                  message.info("Usuario creado satisfactoriamente");
                  form.resetFields();
                  setDisabledRegistrarse(false);
                });
              } else {
                  message.error("Se ha presentado un error. Por favor intente nuevamente.");
                  console.log(response);
                  setDisabledRegistrarse(false);
              }
            },
            (error) => {
              console.log('Hubo un problema con la petición Fetch:' + error.message);
              setDisabledRegistrarse(false);
            }
        );
    } else {
        message.error("Los password no coinciden, por favor confirme el password correctamente");
        setDisabledRegistrarse(false);
    }
  };

  const onVolver = () => {
    window.location.replace("/");
  };

  return (
    <>
    <Row justify="center">
        <Col span={32}><div><img src="alcaldiac_logo.png" /></div></Col>
    </Row>
    <Row justify="center">
        <Col span={32}>
          <Divider orientation="left">Registro de usuario para trámites</Divider>
            <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
                <Form.Item
                    name="name"
                    label="Nombre"
                    rules={[
                    {
                        required: true,
                    },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="last_name"
                    label="Apellidos"
                    rules={[
                    {
                        required: true,
                    },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="username"
                    label="Nombre de usuario"
                    rules={[
                    {
                        required: true,
                    },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                    {
                        type: 'email',
                        required: true,
                        message: 'Por favor ingrese un correo válido',
                    },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="password"
                    label="Password"
                    hasFeedback
                    rules={[
                    {
                        required: true,
                    },
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    name="password2"
                    label="Confirmar Password"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                
                            return Promise.reject(new Error('El password ingresado no coincide!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Divider orientation="left"></Divider>
                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit"  disabled={disabledRegistrarse}>
                    Registrarse
                    </Button>
                    <Button htmlType="button" onClick={onVolver}>
                    Regresar al Login
                    </Button>
                </Form.Item>
            </Form>
        </Col>
    </Row>
    </>
  );
};

export default Tramite