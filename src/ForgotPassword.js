import React, { Component } from 'react';
import logo from './img/Logo-Semitransparent.png';
import './styles/App.css';
import App from './App.js';

// import firebase from './firebase'

class ForgotPassword extends Component {
	state = {
   	data: null,
		changeDone: false
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
	


  	render() {
	    return (
				<div style={{backgroundColor: '#cccccc', height: 1000}}>
          <div style= {styles.centerDiv}>
						<img src={logo} style= {{width: 100, height: 100}}/>
        				<h1>Create Account</h1>
					</div>

          <div style={styles.centerDiv}>
            <label>Username:</label>
          </div>
          <div style={styles.centerDiv}>
            <label>Security Question:</label>
          </div>

          <div style={styles.centerDiv}>
            <label>Security Question Answer:</label>
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
            <button style= {styles.allButton}>
              Create Account
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

export default ForgotPassword;
