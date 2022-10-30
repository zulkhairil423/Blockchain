import React from 'react';
import "./App.css";
import {
    onAuthStateChanged,
    signOut
} from "firebase/auth";
import { auth } from "./firebaseconfig";
import { useState, useEffect } from  "react";
import {useHistory} from "react-router-dom";

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