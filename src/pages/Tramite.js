import React from 'react';
import 'antd/dist/antd.css';
import '../index.css';
import { Form, Input, Button, Select, Divider } from 'antd';
const { Option } = Select;
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

  const onFinish = (values) => {
    console.log(values);
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <>
    <Divider orientation="left">Registro y autorización de títulos en el área de salud</Divider>
    <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
        <Form.Item
            name="institucion"
            label="Institución educativa"
            rules={[
            {
                required: true,
            },
            ]}
        >
            <Select
            placeholder="Seleccione la institución donde se obtuvo el título" allowClear>
                <Option value="male">male</Option>
                <Option value="female">female</Option>
                <Option value="other">other</Option>
            </Select>
        </Form.Item>
        <Form.Item
            name="profesion"
            label="Profesión"
            rules={[
            {
                required: true,
            },
            ]}
        >
            <Select
            placeholder="Seleccione la profesión" allowClear>
                <Option value="male">male</Option>
                <Option value="female">female</Option>
                <Option value="other">other</Option>
            </Select>
        </Form.Item>
        <Form.Item
            name="diploma"
            label="Diploma No."
            rules={[
            {
                required: false,
            },
            ]}
        >
            <Input />
        </Form.Item>
        <Form.Item
            name="acta"
            label="Acta de grado"
            rules={[
            {
                required: false,
            },
            ]}
        >
            <Input />
        </Form.Item>
        <Form.Item
            name="fecha"
            label="Fecha de terminación"
            rules={[
            {
                required: true,
            },
            ]}
        >
            <Input />
        </Form.Item>
        <Form.Item
            name="libro"
            label="Libro"
            rules={[
            {
                required: false,
            },
            ]}
        >
            <Input />
        </Form.Item>
        <Form.Item
            name="folio"
            label="Folio"
            rules={[
            {
                required: false,
            },
            ]}
        >
            <Input />
        </Form.Item>
        <Form.Item
            name="anioTitulo"
            label="Año titulo"
            rules={[
            {
                required: true,
            },
            ]}
        >
            <Input />
        </Form.Item>
        <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
            Submit
            </Button>
            <Button htmlType="button" onClick={onReset}>
            Reset
            </Button>
        </Form.Item>
    </Form>
    </>
  );
};

export default Tramite