import React from "react";
import { useState } from "react";
import { Lessons } from "../../Data/Lessons";
import { LogUser } from "../../Utility/LoginCheck";
import LessonsScreen from "../LessonsScreen/LessonsScreen";
import "./MainScreen.css";
import AdminPanel from "../AdminPanel/AdminPanel";

//Tıklanılan tuşa göre clickhandler ile ders bilgilerini getiriyor
const MainScreen = (props) => {
  const [screenSelector, setSelector] = useState();

//Clickhandlara verilen ders idsine göre screenselectore ilgili dersin bilgilerini veriyor
  const ClickHandler = (dersid) => {
    for (var y = 0; y < Lessons.length; y++)
      //ders id = lessonno aynı olup olmadığını kontrol ediyor ve  değişkene atanıyor
      if (dersid === Lessons[y].lessonno) {
        setSelector([
          <LessonsScreen dersid={Lessons[y].id} dersname={Lessons[y].lessonname}></LessonsScreen>,
        ]);
      }
  };
  //Kullanıcıda hangi dersler var ise sahip olunan ders butonlarını ekliyor
  const butonlar = [];
  LogUser.lessons.forEach((kod) => {
    if (kod === "d1") {
      butonlar[0] = <button onClick={() => ClickHandler("d1")}>MAT101</button>;
    } else if (kod === "d2") {
      butonlar[1] = <button onClick={() => ClickHandler("d2")}>FIZ102</button>;
    } else if (kod === "d3") {
      butonlar[2] = <button onClick={() => ClickHandler("d3")}>ELK321</button>;
    } else if (kod === "d4") {
      butonlar[3] = <button onClick={() => ClickHandler("d4")}>BILYD</button>;
    } else if (kod === "d5") {
      butonlar[4] = <button onClick={() => ClickHandler("d5")}>BIL3203</button>;
    } else if (kod === "d6") {
      butonlar[5] = <button onClick={() => ClickHandler("d6")}>BIL323</button>;
    } else if (kod === "d7") {
      butonlar[6] = <button onClick={() => ClickHandler("d7")}>BIL3201</button>;
    } else if (kod === "d8") {
      butonlar[7] = <button onClick={() => ClickHandler("d8")}>BIL322</button>;
    }
  });
  
  //Giriş yapan kullanıcnın admin olup, olmadığını kontrol ediyor
  return LogUser.id === 0 ? (
    <AdminPanel exitClick={props.exitClick}></AdminPanel>
  ) : (
    <div className="">
      <div className="navbar-css">
        <div className="header-css">
            <div>
              {" "}
              <h1>DERSLERİM </h1>
            </div>
        </div> 
        <div className="userinfo-css"> 
          <h3>{LogUser.username}</h3>
          <h4><u>{LogUser.userno} </u></h4>
          <button className="exitbutton"  onClick={props.exitClick}> <span>Çıkış</span>
            
          </button> 
        </div> 
           
      </div>

        <div className="">
          <div className="">
            <div className="buttonset-css">
              {butonlar.map((buttons) => (
                <div class="buttons-css"> {buttons}  </div>
              ))}
            </div>

            <div>{screenSelector}</div>
          </div>
        </div>     
    </div>
  );
};
export default MainScreen;
