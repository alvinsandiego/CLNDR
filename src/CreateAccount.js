import React, { Component } from 'react';
import logo from './img/Logo-Semitransparent.png';
import './styles/App.css';
import App from './App.js';

import firebase from './firebase'

class CreateAccount extends Component {
	state = {
   	data: null,
		accMade: false
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

	//change state 
	made() {
		this.setState({
			accMade: true
		})	
	}
	


  	render() {
		const login = this.state.accMade

		if(login) {
      return (
			  <App/>	
 	   	);
		}
		else {
			return (
				<div style={{backgroundColor: '#cccccc', height: 1000}}>
          <div style= {styles.centerDiv}>
						<img src={logo} style= {{width: 100, height: 100}}/>
        				<h1>Create Account</h1>
					</div>

          <div style={styles.centerDiv}>
            <label>Username:</label>
            <input type="text"/>
          </div>

          <div style={styles.centerDiv}>
            <label>Password:</label>
            <input type="text"/>
          </div>

          <div style={styles.centerDiv}>
            <label>Confirm Password:</label>
            <input type="text"/>
          </div>

          <div style={styles.centerDiv}>
            <label>Security Question:</label>
            <input type="text"/>
          </div>

          <div style={styles.centerDiv}>
            <label>Security Question Answer:</label>
            <input type="text"/>
          </div>
          
          <div style={styles.centerDiv}>
            <button style= {styles.allButton} onClick= {this.made.bind(this)}>
              Create Account
            </button>
          </div>
				</div>
			);
		}
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

export default CreateAccount;
