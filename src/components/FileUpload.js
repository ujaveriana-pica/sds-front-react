import { Upload, message, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import '../index.css';

const FileUpload = (props) => {
  const apiUrl = window.location.protocol + "//" + window.location.hostname + "/front-office";

    const propsUpload = {
        name: props.type,
        action: apiUrl + `/adjunto/${props.formType}/${props.formId}/${props.uploadType}`,
        headers: {
          authorization: 'authorization-text',
        },
        beforeUpload: file => {
          if (file.type !== 'image/png') {
            message.error(`${file.name} is not a png file`);
          }
          return file.type === 'image/png' ? true : Upload.LIST_IGNORE;
        },
        onChange(info) {
          if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
          }
          if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
            props.onUpload(props.uploadType);
          } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
          }
        },
    };

    return(
        <Upload {...propsUpload}>
            <Button icon={<UploadOutlined />}>Clic para adjuntar</Button>
        </Upload>
    )
}

export default FileUpload
