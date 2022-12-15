import React from "react";
import { useHistory } from "react-router-dom";
import "./App.css";
import { useState } from  "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "./firebaseconfig";
import CarDataStorage from "./artifacts/contracts/Autolog.sol/CarDataStorage.json";
import { ethers } from "ethers";

const autologAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3'

function Homepage() {
  //property variables
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPswrd, setRegisterPswrd] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPswrd, setLoginPswrd] = useState("");
  const [plateNo, setPlateNo] = useState("");
  const history = useHistory();
  
//register function  
  const register = async () => {
    try {
        const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPswrd
      );
      history.push("/formPage");
      console.log(user)
    } catch (error) {
      console.log(error.message);
    }
  };

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
    const contract = new ethers.Contract(autologAddress, CarDataStorage.abi, provider);

    try {
      const data = await contract.viewCar(plateNo);
      console.log(data);

      document.getElementById("itab").innerHTML = data;
      /*for(var i=0; i<data.length; i++){
        document.getElementById("tabdata").innerHTML = <td>data[i]</td>;
      }*/
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="AutoLog">
      <div>
        <h3> Register User </h3>
        <input
          placeholder="Email..."
          class="login-register"
          onChange={(event) => {
            setRegisterEmail(event.target.value);
          }}
        />
        <input
          placeholder="Password..."
          class="login-register"
          onChange={(event) => {
            setRegisterPswrd(event.target.value);
          }}
        />

        <button class="login-reg-button" onClick={register}>Create User</button>
      </div>

      <div>
        <h3> Login </h3>
        <input
          placeholder="Email..."
          class="login-register"
          onChange={(event) => {
            setLoginEmail(event.target.value);
          }}
        />
        <input
          placeholder="Password..."
          class="login-register"
          onChange={(event) => {
            setLoginPswrd (event.target.value);
          }}
        />

        <button class="login-reg-button" onClick={login}>Login</button>
      </div>


      <div>
        <h3> Car Plate Number </h3>
        <input
          placeholder="PlateNo..."
          class="car-plate-no"
          onChange={(event) => {
            setPlateNo(event.target.value);
          }}
        />
        <button class="retrieve-info" onClick={fetchCarData}> Retrieve Car Info</button>
        <table id="itab"></table>
      </div>

    </div>
  );

}
 export default Homepage;
 