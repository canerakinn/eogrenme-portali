import React from "react";
import { LogUser } from "../../Utility/LoginCheck";
import { useState } from "react";
import { Lessons } from "../../Data/Lessons";
import { Users } from "../../Data/Users";
// Import the styles
import "@react-pdf-viewer/core/lib/styles/index.css";
// Import styles of default layout plugin
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import "./AdminPanel.css";
import View from "../Viewer/View";
import { Yoklama } from "../../Data/Yoklama";

export let gloid;
const AdminPanel = (props) => {
  const [selector, setSelector] = useState([<div></div>]);

  const [message, setMessage] = useState();

  // handle file onChange event
  const allowedFiles = ["application/pdf"];

  const [yoklamaSayi, setYoklamaSayi] = useState();
// x = userId   y= LessonsId
  const Ekleme = (x, y) => {
    
    var ax;
//ders zaten varsa hata gösteriyor
    for (var b = 0; b < Users[x].lessons.length; b++) {
      if (Users[x].lessons[b] == "d" + (parseInt(y) + 1)) {
        alert("Öğrenci bu derse sahip");
        ax = b;
      }
    }
//dersi tekrar kontrol edip yoksa ekliyor.    
    if (Users[x].lessons[ax] != "d" + (parseInt(y) + 1)) {
      Users[x].lessons.push("d" + (parseInt(y) + 1));
      setMessage(<div className="texts-css">Ders başarıyla eklendi ✓</div>);
      
    }
  };
// x = userId   y= LessonsId  oldListte dersin silinmemiş hali, newListte dersin silinmiş hali saklanıyor.

  const sil = (x, y) => {
    let oldList = [];
    let newList = [];

    Users.forEach((eleman) => {
      if (eleman.id == x) {
        oldList = eleman.lessons;
      }
    });
    
    for (let index = 0; index < oldList.length; index++) {
      if (oldList[index] !== "d" + (parseInt(y) + 1)) {
        newList.push(oldList[index]);
        setMessage(<div className="texts-css"> Ders başarıyla silindi X </div>);
      }
    }

    Users.forEach((eleman) => {
      if (eleman.id == x) {
        eleman.lessons = newList;
      }
    });
  };
  let leId;
  const setLesId1 = (event) => {
    leId = event.target.value;
    if(leId !== "");
    
    //hangi derse ait yoklamayı bulacağımızı leId'de tutuyoruz.
    const yoklamaCopy = Yoklama[parseInt(leId)].atdList;
    console.log(yoklamaCopy.length);
    setYoklamaSayi("Yoklama Sayısı: " + yoklamaCopy.length);
  };
  let ogId;
  const setOgrNo1 = (event) => {
    ogId = event.target.value;
  };
  

  const icerikEdit = () => {
    return (
    <div> 
      <div className="selectpanel-css">
        <div className="box">
          <select onChange={setLesId1}>
            <option value={""}>Dersler</option>
            {Lessons.map((les) => (
              <option value={les.id}>{les.lessonname}</option>
            ))}
          </select>
        </div>
        <div className="box">
          <select onChange={setOgrNo1}>
            <option>Öğrenciler</option>
            {Users.filter((ogr) => ogr.id !== 0).map((ogr) => (
              <option value={ogr.id}>{ogr.username}</option>
            ))}
          </select>
        </div>
        <div className="buttonspace">
          <button class="button-58" onClick={() => Ekleme(ogId, leId)}>
            Öğrenciyi Derse Ekle
          </button>

          <button class="button-58" onClick={() => sil(ogId, leId)}>
            Öğrenciyi Dersten Kaldır
          </button>
        </div>
      </div>
    </div>
    );
  };

  const dersYukle = () => {
    setYoklamaSayi("");
    setMessage("");
    let globalId;
    const idHandler = (event) => {
      globalId = event.target.value;
      gloid = globalId;
    };
    /* gloidde lesFileListe hangi indexe kayıt edileceğini tutar */
    return (
      <div className="uploadpanel">
        <div className="box">
          <select onChange={idHandler}>
            <option>Dersler</option>
            {Lessons.map((les) => (
              <option value={les.id}>{les.lessonname}</option>
            ))}
          </select>
        </div>
        <View id={globalId}></View>
      </div>
    );
  };

  return (
    <div>
      <div className="navbar-css">
        <div className="header-css">
          <h1>Yönetim Paneli</h1>
        </div>

        <div className="userinfo-css">
          <h2>{LogUser.username}</h2>
          <h4>
            <u>{LogUser.userno} </u>
          </h4>
          <button className="exitbutton" onClick={props.exitClick}>
            {" "}
            <span>Çıkış</span>
          </button>
        </div>
      </div>

      <div className="mainbuttons">
        <div className="mainbuttons">
          <div>
            <button
              class="button-82-pushable"
              role="button"
              onClick={() => setSelector(icerikEdit)}
            >
              <span class="button-82-shadow"></span>
              <span class="button-82-edge"></span>
              <span class="button-82-front text">
                Ders Ekleme/Silme/Yoklama {" "}
              </span>
            </button>
          </div>

          <div>
            <button
              class="button-82-pushable"
              role="button"
              onClick={() => setSelector(dersYukle)}
            >
              <span class="button-82-shadow"></span>
              <span class="button-82-edge"></span>
              <span class="button-82-front text">Ders İçeriği Yükleme </span>
            </button>
          </div>
        </div>
        <div>
          <div>
            <div >       
              {selector}
            </div>
          </div>
          <h1>{message}</h1>
          <div>
          <h1 className="yoklamayazi">{yoklamaSayi}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
