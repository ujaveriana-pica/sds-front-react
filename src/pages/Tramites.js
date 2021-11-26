import { Table, Space } from 'antd';
import React, { useState, useEffect } from 'react';
import { message } from 'antd';
import {RestClientGet} from '../clients/RestClient';
import 'antd/dist/antd.css';
import '../index.css';

const dataSource2 = [
  {
    key: '1',
    tipo: 'Mike',
    fechaCreacion: 32,
    fechaRadicacion: '10 Downing Street',
    estado: 'Borrador'
  },
  {
    key: '2',
    tipo: 'John',
    fechaCreacion: 42,
    fechaRadicacion: '10 Downing Street',
    estado: 'Borrador'
  },
];
  
const columns = [
  {
    title: 'Código Radicación',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Tipo de trámite',
    dataIndex: 'tipo',
    key: 'tipo',
  },
  {
    title: 'Fecha de creación',
    dataIndex: 'fechaCreacion',
    key: 'fechaCreacion',
  },
  {
    title: 'Fecha de radicación',
    dataIndex: 'fechaRadicacion',
    key: 'fechaRadicacion',
  },
  {
    title: 'Estado',
    dataIndex: 'estado',
    key: 'estado',
  },
  {
    title: 'Acción',
    key: 'accion',
    render: (text, record) => (
      <Space size="middle">
        <a href={ `/tramite/${record.id}`}>Ver</a>
      </Space>
    ),
  },
];
  
const Tramites = () => {
  const [dataSource, setDataSource] = useState([]);
  useEffect(() => {
    RestClientGet('/front-office/tramite/usuario/1',
      (response) => {
        if(response.ok) {
          response.json().then(data => {
            setDataSource(data);
          });
        } else {
            message.error("Se ha presentado un error. Por favor intente nuevamente.");
            console.log(response);
        }
      },
      (error) => {
        console.log('Hubo un problema con la petición Fetch:' + error.message);
      }
    );
  }, []);

  if(dataSource && dataSource.length > 0) {
    return(
      <Table dataSource={dataSource} columns={columns} />
    )
  }
  else {
    return(
      <p>Cargando ... </p>
    )
  }
}

export default Tramites