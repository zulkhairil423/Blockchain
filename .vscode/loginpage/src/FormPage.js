import React from 'react';
import "./App.css";
import {
    onAuthStateChanged,
    signOut,
    sendPasswordResetEmail
} from "firebase/auth";
import { auth } from "./firebaseconfig";
import { useState, useEffect } from  "react";
import {useHistory} from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Autolog from "./artifacts/contracts/Autolog.sol/CarDataStorage.json";
import { ethers } from "ethers";

const autologAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3'

function FormPage() {

    const [carplateno, setcarplateno] = useState("");
    const [selectdate, setselectDate] = useState("");
    const [fullname, setFullName] = useState("");
    const [detail, setReportDetail] = useState("");
    const [jobs, setjobs] = useState("");
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

    const changePassword = async () => {
      try {
          await sendPasswordResetEmail(
          auth,
          user.email
        );
        alert("Password reset email sent")
        
      } catch (error) {
        alert(error)
      }
      
    };
 
    const submit = async () => {

      const provider = new ethers.providers.JsonRpcProvider();
      const signer = provider.getSigner();
      const contract = new ethers.Contract(autologAddress, Autolog.abi, signer);
      const dateString = new Date(selectdate).toString();
      const newdateString = dateString.split(' ').slice(0,4).join(' ');
      
      const report = detail.concat(', ',fullname,', ',jobs,', ', newdateString);
      const transaction = await contract.updateCar(carplateno, report);

      var getCarPlate = document.getElementById("carplate");
      if (getCarPlate.value !==""){
        getCarPlate.value = "";
      }

      var getName = document.getElementById("name");
      if (getName.value !==""){
        getName.value = "";
      }

      var getJobs = document.getElementById("jobs");
      if (getJobs.value !==""){
        getJobs.value = "";
      }

      var getReport = document.getElementById("report");
      if (getReport.value !==""){
        getReport.value = "";
      }
      
      setReportDetail("");
      setFullName("");

      await transaction.wait();
      console.log(report);
      alert("Form submitted successfully");
    };
    
    return(
      <div className='Report-Page'>
        <h2 className='form-header'>Report Form Page</h2>
        <h4 className='userlogin'>User Logged In</h4>
        <div className='userlogin'>{user?.email}</div>
        <div className='logout-changepass'>
          <button className = "logout" onClick={logout}>Logout</button>
          &nbsp;
          <button className = "changepass" onClick={changePassword}>Change Password</button>
        </div>
        
      <div className='ReportForm'>
        <div className='reportborder'>
        <h3> Car Plate Number:  
        &nbsp;
          <input
            id='carplate'
            placeholder="Car Plate Number..."
            className="car-plate-no"
            onChange={(event) => {
              setcarplateno(event.target.value);
            }}
          />
        </h3>
          <h3> Date: 
          <DatePicker
            placeholder="Date..."
            className='date-of-report'
            selected={selectdate}
            onChange={date => setselectDate(date)
            }
            dateFormat='dd/MM/yyyy'
          />
          </h3>
          <h3> Reporter's Name: 
          &nbsp;
          <input
            id='name'
            placeholder="Full Name..."
            className="reporters-name"
            onChange={(event) => {
              setFullName(event.target.value);
            }}
          />
          </h3>
          <h3> Jobscope: 
            <select
            id='jobs'
            onChange={(e)=>{setjobs(e.target.value)}} 
            className='jobscope-input'>
              <option defaultValue></option>
              <option value={"Vehicle Mechanic"}>Vehicles Mechanic</option>
              <option value={"JPJ"} >JPJ</option>
              <option value={"Puspakom Inspector"} >Puspakom Inspector</option>
            </select>
          </h3>
          <h3> Report's Detail: </h3>
          <textarea
            id='report'
            placeholder="Detail..."
            className="car-detail-info"
            onChange={(event) => {
              setReportDetail(event.target.value);
            }}
          />
          <div className='submit'>
        <button className='submit-report' onClick={submit}>Submit Report</button>
        </div>
        </div>
      </div>
      </div>
    );
}

export default FormPage