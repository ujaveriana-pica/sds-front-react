import { Worker } from '@react-pdf-viewer/core';
// Import the main component
import { Viewer } from '@react-pdf-viewer/core';

// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import { uploadHeaders, hostname } from '../clients/RestClient';
import { useParams } from "react-router-dom";

const TramiteVer = () => {
    const { id } = useParams();
    const pdfUrl = window.location.protocol + "//" + hostname + "/front-office/tramite/resolucion/" + id;
    return (
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.10.377/build/pdf.worker.min.js">
            <Viewer fileUrl={pdfUrl} httpHeaders={uploadHeaders} />;
        </Worker>
    )
}

export default TramiteVer