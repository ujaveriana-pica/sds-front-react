import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Link,
} from "react-router-dom";
import 'antd/dist/antd.css';
import { Layout, Menu, Breadcrumb } from 'antd';

import Home from './pages/Home'
import Login from './pages/Login'
import Registro from './pages/Registro'
import Tramite from './pages/Tramite'
import Tramites from './pages/Tramites'
import FormJson from './pages/Form'
import TramiteVer from './pages/TramiteVer'
const { Header, Content, Footer } = Layout;


function App() {
  const token = localStorage.getItem('token');

  const onClick = (values) => {
    console.log(values);
    if(token) {
        localStorage.clear();
        window.location.replace("/");
    }
};

  if(token) {
    return (
      <Router>
        <Layout className="layout">
          <Header>
            <div className="logo" ></div>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
              <Menu.Item key="1">
                <Link to="/"><span className="nav-text">Ventanilla</span></Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/tramites"><span className="nav-text">Estado de trámites</span></Link>
              </Menu.Item>
              <Menu.Item key="3">
                <span className="nav-text" onClick={onClick}>Salir</span>
              </Menu.Item>
            </Menu>
          </Header>
          <Content style={{ padding: '0 50px' }}>
            <div className="site-layout-content">
              <Route exact path="/" component={Home} />
              <Route exact path="/tramite" component={Tramite} />
              <Route exact path="/tramites" component={Tramites} />
              <Route exact path="/form" component={FormJson} />
              <Route exact path="/tramite/:id" component={TramiteVer} />
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Secretaria Distrital de Salud ©2021 Powered By Grupo Ares</Footer>
        </Layout>
      </Router>
    );
  }
  else {
    return(
      <Router>
          <Layout className="layout">
            <Content style={{ padding: '0 50px' }}>
              <div className="site-layout-content">
                <Route exact path="/" component={Login} />
                <Route exact path="/registro" component={Registro} />
              </div>
            </Content>
          </Layout>
        </Router>
    )
  }
}

export default App;
