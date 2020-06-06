import React, { Component } from 'react';
import "./styles/App.css"
import logo from './img/Logo-Semitransparent.png';
import NavBar from "./NavBar";
import axios from "axios";
import { Timestamp } from '@google-cloud/firestore';

class EditEventPage extends Component {

}

const styles = {
    centerDiv: {
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center'
    },
    allButton: {
      height: 40, 
      width: 100
    }
  };
  
export default EditEventPage;
