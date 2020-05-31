import React, { Component } from 'react';
import logo from './img/Logo-Semitransparent.png';
import './styles/App.css';
import App from './App.js';

import firebase from './firebase'
import EventPage from "./EventPage";
import axios from "axios";

class ForgotPassword extends Component {

    constructor(props) {
        super(props);

        const eventID = this.props.username;


        this.state = {
            data: null,
            changeDone: false,
            username:"21",
            securityQuestion:"What is 9+10"
        };
    };


   componentDidMount() {
   	// call fetch
   	this.callBackendAPI().then(res => this.setState({ data: res.express })).catch(err => console.log(err));
 	}

   callBackendAPI = async() => {
   	const response = await fetch('/test');
   	const body = await response.json();

   	if (response.status !== 200) {
      	throw Error(body.message);
   	}

    	return body;
  	};



    componentDidMount = () =>{
        axios.get("http://localhost:5000/userInfo?username="+this.props.username).then(response => {
            this.setState({
                securityQuestion: response.data.sec_question
            })
        });
    };


	


  	render() {
	    return (
				<div style={{backgroundColor: '#d6f3ff', height: 1000}}>
          <div style= {styles.centerDiv}>
						<img src={logo} style= {{width: 100, height: 100}}/>
        				<h1>Forgot Password</h1>
					</div>

          <div class='left'>
            <label>Username: {this.state.username}</label>
          </div>
          <div class='left'>
            <label>Security Question:&nbsp;{this.state.securityQuestion}</label>
          </div>

          <div class='left'>
            <label>Security Question Answer:&nbsp;</label>
            <input type="text"/>
          </div>
          <div style={styles.centerDiv}>
            <label>New Password:</label>
            <input type="text"/>
          </div>

          <div style={styles.centerDiv}>
            <label>Confirm New Password:</label>
            <input type="text"/>
          </div>

          <div style={styles.centerDiv}>
            <button class='control_button'>
              Confirm
            </button>
          </div>
				</div>
			);
		}
  }

const styles = {
  centerDiv: {
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  allButton: {
    height: 40, 
    width: 175
  }
};


EventPage.defaultProps = {username: new String}

export default ForgotPassword;
