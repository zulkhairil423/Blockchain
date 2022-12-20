import React from 'react';
import "./App.css";
import {
    onAuthStateChanged,
    signOut
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
 
    const submit = async () => {

      const provider = new ethers.providers.JsonRpcProvider();
      const signer = provider.getSigner();
      const contract = new ethers.Contract(autologAddress, Autolog.abi, signer);

      const report = detail.concat("\n\n\n", fullname, "\n", selectdate);

      const transaction = await contract.updateCar(carplateno, report);

      setReportDetail("");
      setFullName("");

      await transaction.wait();
      console.log("Details submitted successfully");
      alert("Form submitted successfully");
    };
    
    return(
      <div className='Report-Page'>
        <h2 className='form-header'>Report Form Page</h2>
        <h4 className='userlogin'>User Logged In</h4>
        <div className='userlogin'>{user?.email}</div>
        <div className='logout-changepass'>
          <button className = "logout" onClick={logout}>Logout</button>
        </div>
        
      <div className='ReportForm'>
        <div className='reportborder'>
        <h3> Car Plate Number:  
          <input
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
          <input
            placeholder="Full Name..."
            className="reporters-name"
            onChange={(event) => {
              setFullName(event.target.value);
            }}
          />
          </h3>
          <h3> Jobscope: 
            <select className='jobscope-input' value={jobs} onChange={e=>setjobs(e.target.value)}
            placeholder="Jobscope..">
              <option>JPJ</option>
              <option>Puspakom Inspector</option>
              <option>Vehicles Mechanic</option>
            </select>
          </h3>
          <h3> Report's Detail: </h3>
          <textarea
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