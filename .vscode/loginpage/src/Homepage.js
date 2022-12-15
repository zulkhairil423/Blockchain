import React from "react";
import { useHistory } from "react-router-dom";
import "./App.css";
import { useState } from  "react";
import {
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "./firebaseconfig";
import Autolog from "./artifacts/contracts/Autolog.sol/CarDataStorage.json";
import { ethers } from "ethers";

const autologAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3'

function Homepage() {
  //property variables
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPswrd, setLoginPswrd] = useState("");
  const [plateNo, setPlateNo] = useState("");
  const history = useHistory();


//login function
  const login = async () => {
    try {
        const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPswrd
      );
      history.push("/formPage");
      console.log(user)
      
    } catch (error) {
      console.log(error.message);
    }
    
  };

  
//retrive car info function
  async function fetchCarData () {    
    const provider = new ethers.providers.JsonRpcProvider();
    const contract = new ethers.Contract(autologAddress, Autolog.abi, provider);

    try {
      const data = await contract.viewCar(plateNo);
    console.log('Data: ', data);
    document.getElementById("itab").innerHTML = data;
  } catch (error) {
    console.log(error.message);
  }
};

  return (
    <div className="AutoLog">
      <h3 className="login"> Login </h3>
      <div className="login">
        <input
          placeholder="Email..."
          class="login-register"
          onChange={(event) => {
            setLoginEmail(event.target.value);
          }}
        />
      </div>


      <div className="login"> 
        <input
          type={"password"}
          placeholder="Password..."
          class="login-register"
          onChange={(event) => {
            setLoginPswrd (event.target.value);
          }}
        />
      </div>
      <div className="login">
        <button class="login-reg-button" onClick={login}>Login</button>
      </div>


      <h3 className="callcarinfo"> Retrieve Your Car's Data </h3>
      <div className="callcarinfo">
        <input
          placeholder="PlateNo..."
          class="car-plate-no"
          onChange={(event) => {
            setPlateNo(event.target.value);
          }}
          value = {plateNo}
        />
        <button class="retrieve-info" onClick={fetchCarData}> Retrieve </button>
        </div>
      <div className="callcarinfo">  
        <p id="itab"></p>
      </div>
          
    </div>
  );

}
 export default Homepage;
 