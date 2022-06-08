import React from "react";
import { useState } from "react";
import LoginCheck from "../../Utility/LoginCheck";
import MainScreen from "../MainScreen/MainScreen";
import "./LoginForm.css";



const LoginForm = () => {
    
    //Kullanıcıdan alınan isim ile şifre
    const [enteredUserno, setEnteredUserno] = useState('');
    const [enteredPassword, setEnteredPassword] = useState('');
    
    //kullanıcı ekrana her yazdığında ekranda ki yazılan değeri alıp entreduserno değişkinine atayan fonksiyonlar.
    const usernoChangeHandler = (event) =>{
        setEnteredUserno(event.target.value);
    };

    const passwordChangeHandler = (event) =>{
        setEnteredPassword(event.target.value);
    };
    //LoginCheck userno,pw'du kontrol ediyor, true yada false döndürecek
    //LogState kullacının giriş yapıp yapmadığını kontrol ettiğimiz değişken
    const [logState, setLogState] = useState(false);
    const loginHandler = () => {
        setLogState(LoginCheck([enteredUserno,enteredPassword]));
    };
    const exitHandler = () =>{
    setEnteredUserno("");
    setEnteredPassword("");
    setLogState(false);};

    //LogState True olmadığı sürece, MainScreene giriş yapamıyor
    return logState === false ? (
    
    <div className="loginformbg">
        <div className="main">
            <div className="sub-main">
                <div>
                    <div> <h1> Giriş Paneli </h1></div>
                    <div>
                        <label className="labels-css"> Öğrenci No:</label> 

                        <input className="input-css"
                        type="text" 
                        value={enteredUserno} 
                        onChange={usernoChangeHandler} 
                        placeholder="öğrenci no..."
                        labelName="Öğrenci Adı"       
                        required/>
                                                
                        <label className="labels-css"> Şifre:</label>

                        <input  className="input-css"
                            type="text" 
                            value={enteredPassword} 
                            onChange={passwordChangeHandler} 
                            placeholder="şifre..." 
                        required/>
                    </div>
                    <div>
                    <button id="loginbutton-css" onClick={loginHandler}> Giriş </button>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
    ):(
        <MainScreen exitClick={exitHandler}></MainScreen>
   
    );
}

export default LoginForm;