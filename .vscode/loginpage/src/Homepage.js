import React from "react";
import { useHistory } from "react-router-dom";
import "./App.css";
import { useState } from  "react";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "./firebaseconfig";
import Autolog from "./artifacts/contracts/Autolog.sol/CarDataStorage.json";
import { ethers } from "ethers";
import { Icon } from 'react-icons-kit';
import {eyeClosed} from 'react-icons-kit/oct/eyeClosed';
import {eye} from 'react-icons-kit/oct/eye';

const autologAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3'

function Homepage() {
  //property variables
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPswrd, setLoginPswrd] = useState("");
  const [plateNo, setPlateNo] = useState("");
  const history = useHistory();
  const [icon, setIcon] = useState(eyeClosed);
  const [pass, setPass] = useState('password');
  const [useremail, setUserEmail] = useState('');
  const [vData, setVData] = useState([]);

  //hide and show password function
  const hidePass = () => {
    if(pass==='password'){
      setIcon(eye);      
      setPass('text');
    }
    else{
      setIcon(eyeClosed);     
      setPass('password');
    }
  }

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
      alert("Email/Password is invalid");
    }
    
  };

  //forget password function
  const forgetPassword = async () => {
    try {
      await sendPasswordResetEmail(
      auth,
      useremail
    );
    alert("Password reset email sent")
    
  } catch (error) {
    alert(error)
  }
  
};

//retrive vehicle info function
  async function fetchvehicleData () {    
    const provider = new ethers.providers.JsonRpcProvider();
    const contract = new ethers.Contract(autologAddress, Autolog.abi, provider);

    try {
    const data = await contract.viewCar(plateNo);
    console.log('Data: ', data);
    setVData(data);
    document.getElementById("displayplate").innerHTML = plateNo;
  } catch (error) {
    console.log(error.message);
    alert(error)
  }
};

  return (
    <div className="AutoLog">
      <h3 className="login"> Autolog Login Page </h3>
      <div className="login">
        <input
          placeholder="Email..."
          className="email"
          onChange={(event) => {
            setLoginEmail(event.target.value);
            setUserEmail(event.target.value);
          }}
        />
      </div>

      <div className="login"> 
        <input
          type={pass}
          placeholder="Password..."
          className="password"
          onChange={(event) => {
            setLoginPswrd (event.target.value);
          }}
        />
        <span><Icon onClick={hidePass} icon={icon} size={25}/></span>
      </div>
      <div className="login">
      <text onClick={forgetPassword}>Forget Password?</text>
      </div>
      
      <div className="login">
        <button className="login-button" onClick={login}>Login</button>
      </div>


      <h3 className="callvehicleinfo"> Retrieve Your Vehicle's Data </h3>
      <div className="callvehicleinfo">
        <input
          placeholder="PlateNo..."
          className="vehicle-plate-no"
          onChange={(event) => {
            setPlateNo(event.target.value);
          }}
          value = {plateNo}
        />
        <button className="retrieve-info" onClick={fetchvehicleData}> Retrieve </button>
        </div>
        <br/>
      <div className="callvehicleinfo">
        <table className="tablevehicle">
          <tr>
            <th>Vehicle Info: <span id="displayplate"></span></th>
          </tr>
          <tbody id="maketable">
          {
            vData.map(item => {return <tr><td>{item}</td></tr>})
          }
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default Homepage;
 