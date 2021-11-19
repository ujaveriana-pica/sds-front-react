import { React, useState} from 'react';
import 'antd/dist/antd.css';
import '../index.css';
import { Form, Input, Button, Divider, message } from 'antd';
const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 8,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 4,
    span: 8,
  },
};

const Tramite = () => {
  const [form] = Form.useForm();
  const [disabledRegistrarse, setDisabledRegistrarse] = useState(false);

  const onFinish = (values) => {
    console.log(values);
    const apiUrl = window.location.protocol + "//" + window.location.hostname + "/api";
    if(values.password === values.password2) {
        setDisabledRegistrarse(true);
        values.status = "ACTIVE";
        values.rol = "CIUDADANO"
        fetch(apiUrl + '/user/sign-up', {
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
                message.info("Usuario creado satisfactoriamente");
                form.resetFields();
                setDisabledRegistrarse(false);
              });
            } else {
                message.error("Se ha presentado un error. Por favor intente nuevamente.");
                console.log(response);
                setDisabledRegistrarse(false);
            }
          })
          .catch(function(error) {
            console.log('Hubo un problema con la petición Fetch:' + error.message);
            setDisabledRegistrarse(false);
          });
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
        <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit"  disabled={disabledRegistrarse}>
            Registrarse
            </Button>
            <Button htmlType="button" onClick={onVolver}>
            Regresar al Login
            </Button>
        </Form.Item>
    </Form>
    </>
  );
};

export default Tramite