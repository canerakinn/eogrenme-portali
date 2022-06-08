import { useState } from "react";
// Import Worker
import { Worker } from "@react-pdf-viewer/core";
// Import the main Viewer component
import { Viewer } from "@react-pdf-viewer/core";
// Import the styles
import "@react-pdf-viewer/core/lib/styles/index.css";
// default layout plugin
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
// Import styles of default layout plugin
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { gloid } from "../AdminPanel/AdminPanel";
import "../Viewer/View.css";
export const lesFileList = [null, null, null, null, null, null, null, null];

const View = () => {
  // creating new plugin instance
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  // pdf file onChange state
  const [pdfFile, setPdfFile] = useState(null);

  // pdf file error state
  const [pdfError, setPdfError] = useState("");

  // handle file onChange event
  const allowedFiles = ["application/pdf"];
  const handleFile = (e) => {
    let selectedFile = e.target.files[0];
    // console.log(selectedFile.type);
    if (selectedFile) {
      if (selectedFile && allowedFiles.includes(selectedFile.type)) {
        let reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = (e) => {
          setPdfError("");
          lesFileList[gloid] = e.target.result;
        };
      } else {
        setPdfError("Herhangi bir pdf seçilmedi");
        setPdfFile("");
      }
    } else {
      console.log("Lütfen bir pdf seçiniz");
    }
  };

  return (
    <div>
      <div className="container">
        {/* Upload PDF */}
        <form>
          <label>
            <h4>PDF Yükleme</h4>
          </label>
          <br></br>

          <input 
            type="file"           
            onChange={handleFile}
          ></input>

          {pdfError && <span className="text-danger">{pdfError}</span>}
        </form>

        {/* View PDF */}
        
        <div className="viewer">
          {/* render this if we have a pdf file */}
          {pdfFile && (
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.12.313/build/pdf.worker.min.js">
              <Viewer
                fileUrl={pdfFile}
                plugins={[defaultLayoutPluginInstance]}
              ></Viewer>
            </Worker>
          )}

          {/* render this if we have pdfFile state null   */}
          {!pdfFile && <></>}
        </div>
      </div>
    </div>
  );
};

export default View;
