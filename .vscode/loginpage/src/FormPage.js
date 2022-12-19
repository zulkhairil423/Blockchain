import React from 'react';
import "./App.css";
import {
    onAuthStateChanged,
    signOut
} from "firebase/auth";
import { auth } from "./firebaseconfig";
import { useState, useEffect } from  "react";
import {useHistory} from "react-router-dom";
import { ethers } from "ethers";
import CarDataStorage from "./artifacts/contracts/Autolog.sol/CarDataStorage.json";

const autologAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3'

function FormPage() {
    const [date, setDate] = useState("");
    const [fullname, setFullName] = useState("");
    const [detail, setReportDetail] = useState("");
    const history = useHistory();

    const [user, setUser] = useState({});
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });
}, [])
  
    const logout = async () => {
        await signOut(auth);
        history.push("/");
      };
 
    const submit = async () => {
      if (!detail) return;
      if (!date) return;
      if (!fullname) return;

      const provider = new ethers.providers.JsonRpcProvider();

      const contract = new ethers.Contract(autologAddress, CarDataStorage.abi, provider);
      
      const report = detail.concat("\n\n\n", fullname, "\n", date);
      
      const transaction = await contract.updateCar(report);

      setReportDetail("");
      setDate("");
      setFullName("");

      await transaction.wait();
      console.log("Details submitted successfully");
    };
    
    return(
      <div className='Insert Car Detail Page'>
        <h2>Report Form Page</h2>
        <h4>User Logged In</h4>
        {user?.email}
        <button class = "logout" onClick={logout}>Logout</button>
        <div>
          <h3> Date </h3>
          <input
            placeholder="Date..."
            class="date-of-report"
            onChange={(event) => {
              setDate(event.target.value);
            }}
          />
          <h3> Reporter's Name </h3>
          <input
            placeholder="Full Name..."
            class="reporters-name"
            onChange={(event) => {
              setFullName(event.target.value);
            }}
          />
          <h3> Report's Detail </h3>
          <textarea
            placeholder="Detail..."
            class="car-detail-info"
            onChange={(event) => {
              setReportDetail(event.target.value);
            }}
          />
        </div>
        <div>
        <button onClick={submit}>Submit Report</button>
        </div>
      </div>
    );
}

export default FormPage