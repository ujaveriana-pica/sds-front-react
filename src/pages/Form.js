import React, { useState, useEffect } from 'react';
import Form from "@rjsf/antd";
import { Upload, message, Button, Space, Card, Row, Col } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import FileUpload from '../components/FileUpload';
import 'antd/dist/antd.css';
import '../index.css';
import { convertLegacyProps } from 'antd/lib/button/button';

const schema2 = { 
    type: "autorizacion-titulos",
    title: "Registro y autorización de títulos en el área de salud",
    form: {
        type: "object",
        properties: {
            institucion: {
                type: "string",
                title: "Institución educativa: ",
                enum: ["1", "2", "3"],
                enumNames: ["one", "two", "three"]
            },
            profesion: {
                type: "string",
                title: "Profesión: ",
            },
            diploma: {
                type: "string",
                title: "Diploma No.: ",
            },
            acta: {
                type: "string",
                title: "Acta de grado: ",
            },
            fecha: {
                type: "string",
                title: "Fecha de terminación: ",
            },
            libro: {
                type: "string",
                title: "Libro: ",
            },
            folio: {
                type: "string",
                title: "Folio: ",
            },
            anioTitulo: {
                type: "string",
                title: "Año titulo: ",
            }
        },
        "required": ["institucion", "profesion", "fecha", "anioTitulo"]
    },
    uploads: [
        {
            type: "documento-identificacion",
            title: "Documento de identificación"
        },
        {
            type: "diploma",
            title: "Diploma de grado"
        },
        {
            type: "acta",
            title: "Acta de grado"
        }
    ]
};

const uiSchema = {
    classNames: "custom-css-class"
};



const FormJson = () => {
    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState({});
    const [disabledSubmit, setDisabledSubmit] = useState(false);
    const [disabledRadicar, setDisabledRadicar] = useState(true);
    const [schema, setSchema] = useState({});
    const [uploadFiles, setUploadFiles] = useState(new Map());

    useEffect(() => {
        fetch('http://localhost/schema/autorizacion-titulos', {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
              'Content-Type': 'application/json'
            }
        }).then(function(response) {
            setDisabledSubmit(false);
            if(response.ok) {
              response.json().then(data => {
                setSchema(data);
                var up = new Map();
                data.uploads.forEach((value) => {
                    up.set(value.type, false);
                })
                setUploadFiles(up);
              });
            } else {
                message.error("Se ha presentado un error. Por favor intente nuevamente.");
                console.log(response);
            }
          })
          .catch(function(error) {
            setDisabledSubmit(false);
            console.log('Hubo un problema con la petición Fetch:' + error.message);
          });
      }, []);

    const onSubmit = (e) => {
        setDisabledSubmit(true);
        console.log(e.formData);
        const form = {
            data: e.formData,
            type: schema.type
        }
        fetch('http://localhost/forms', {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
              'Content-Type': 'application/json'
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(form)
        }).then(function(response) {
            setDisabledSubmit(false);
            if(response.ok) {
              response.json().then(data => {
                setFormData(data);
                setStep(1);
                console.log(data.id);
                console.log("GRABADO");
              });
            } else {
                message.error("Se ha presentado un error. Por favor intente nuevamente.");
                console.log(response);
            }
          })
          .catch(function(error) {
            setDisabledSubmit(false);
            console.log('Hubo un problema con la petición Fetch:' + error.message);
          });
        
    }

    const onUpload = (uploadType) => {
        console.log(uploadFiles);
        console.log("FEO !!!! " + uploadType)
        uploadFiles.set(uploadType, true);
        
        uploadFiles.forEach((value, key) => {
            console.log(value);
            var disable = false;
            if(!value) {
                disable = true;
            }    
            console.log(disable);        
            setDisabledRadicar(disable);
        })

    }

    const onRadicar = (e) => {
        setDisabledRadicar(true);
        fetch('http://localhost/forms/radicar/' + formData.id, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, *cors, same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'same-origin', // include, *same-origin, omit
            headers: {
              'Content-Type': 'application/json'
              // 'Content-Type': 'application/x-www-form-urlencoded',
            }
        }).then(function(response) { 
            if(response.ok) {
              response.json().then(data => {
                setStep(2);
              });
            } else {
                setDisabledRadicar(false);
                message.error("Se ha presentado un error. Por favor intente nuevamente.");
                console.log(response);
            }
          })
          .catch(function(error) {
            setDisabledRadicar(false);
            console.log('Hubo un problema con la petición Fetch:' + error.message);
          });
    }

    if(step === 0) {
        if(!schema.form) {
            return(
                <p>Cargando !!!</p>
            )
        }
        else {
            return(
                <>
                    <h1>{schema.title}</h1>
                    <Form schema={schema.form} uiSchema={uiSchema} noHtml5Validate onSubmit={e => onSubmit(e)}>
                        <div>
                            <button type="submit" disabled={disabledSubmit} >Siguiente</button>
                        </div>
                    </Form>
                </>
            )
        }
    } else if(step === 1) {
        return(
            <>
                <h1>{schema.title}</h1>
                <Row>
                    <Col span={24}>
                        <Space direction="horizontal">
                        {schema.uploads.map((value, index) => {
                            return( 
                                <Card title={value.title} style={{ width: 300 }}>
                                    <p><FileUpload formId={formData.id} formType={schema.type} uploadType={value.type} type="thefile" onUpload={onUpload} /></p>        
                                </Card>
                            )
                        })}
                        <button type="button" disabled={disabledRadicar} onClick={onRadicar} >Radicar</button>
                        </Space>
                    </Col>
                </Row>
            </>
        )
    } else if(step === 2) {
        return(
            <>
                <p>Se ha radicado correctamente el formulario, el número de radicación es: {formData.id}</p>
            </>
        )
    }
}

export default FormJson