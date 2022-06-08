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
import { lesFileList } from "../Viewer/View";
import { Yoklama } from "../../Data/Yoklama";
import { LogUser } from "../../Utility/LoginCheck";
import { Lessons } from "../../Data/Lessons";
import "./LessonsScreen.css"

const LessonsScreen = (props) => {
  // creating new plugin instance
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  // handle file onChange event
  const allowedFiles = ["application/pdf"];

  // yoklama alma fonksiyonu
  const yoklamaHandler = () => {
    let yoklamaIndex;
  // kullanıcının var olup olmadığını kontrol ettiğimiz değişken, false= yok, true=var   
    let exists = false;
    for (let index = 0; index < Lessons.length; index++) {
      if (props.dersid === Lessons[index].id) {
        yoklamaIndex = index;
        let yoklamaCopy = Yoklama[index].atdList;
        for (let index = 0; index < yoklamaCopy.length; index++) {
          if (yoklamaCopy[index] === LogUser.id) {
            //eğer yoklamada kullanıcı var ise true olur.
            exists = true; 
          }
        }
      }
    }
    
    // aynı kullanıcı tıkladığında kontrolü yapılıp ekleme yapılmıyor
    if (!exists) Yoklama[yoklamaIndex].atdList.push(LogUser.id);
  };

  return (
    <div>
      <div className="lessonname-css">
        <h1> {props.dersname} </h1>
        <button className="yoklama-button" onClick={yoklamaHandler}>Yoklamaya Katıl</button>
        <div className="container">
        {/* View PDF */}
        <h2>Ders İçeriği</h2>
        </div>
      </div>  
        <div>
          <div className="pdf-container">
            {lesFileList[props.dersid] && (
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.12.313/build/pdf.worker.min.js">
              <Viewer
                      /* seçilen ders idsine göre lesFileList ile aynı indexteki olan pdfyi ekranda gösterir. */
                fileUrl={lesFileList[props.dersid]}
                plugins={[defaultLayoutPluginInstance]}
              ></Viewer>
            </Worker>
          )}
          </div>          
          {!lesFileList[props.dersid] && (
            <>Bu derse ait içerik bulunmamaktadır.</>
          )}
        </div>
      </div>
    
  );
};

export default LessonsScreen;
