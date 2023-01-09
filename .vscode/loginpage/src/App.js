import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import './App.css';
import Homepage from "./Homepage";
import FormPage from "./FormPage";


function App() {
  return (
    <div className='AutologWebsite'>
    <>
    <Router>
      <Switch>
        <Route exact path="/"
            component={Homepage}/>
        <Route exact path="/formPage"
            component={FormPage}/>    
      </Switch>
    </Router>
    </>
    </div>
  );
}



export default App;
