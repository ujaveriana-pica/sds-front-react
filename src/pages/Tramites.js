import { Table, Space } from 'antd';
import React, { useState, useEffect } from 'react';
import { message } from 'antd';
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

  const apiUrl = window.location.protocol + "//" + window.location.hostname + "/front-office";

  useEffect(() => {
    fetch(apiUrl + '/tramite/usuario/1', {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': 'cHJ1ZWJhMTtjaXVkYWRhbm8='
        }
    }).then(function(response) {
        if(response.ok) {
          response.json().then(data => {
            setDataSource(data);
          });
        } else {
            message.error("Se ha presentado un error. Por favor intente nuevamente.");
            console.log(response);
        }
      })
      .catch(function(error) {
        console.log('Hubo un problema con la petición Fetch:' + error.message);
      });
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