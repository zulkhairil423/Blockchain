import React from "react";
import { useHistory } from "react-router-dom";
import "./App.css";
import { useState } from  "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "./firebaseconfig";
import Autolog from "./artifacts/contracts/Autolog.sol/CarDataStorage.json";
import { ethers } from "hardhat";

const autologAddress = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512'

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
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(autologAddress, Autolog.abi, provider);

    try {
      const data = await contract.viewCar(plateNo);
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
      </div>

    </div>
  );

}
 export default Homepage;
 