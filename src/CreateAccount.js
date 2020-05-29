import React, { Component } from 'react';
import logo from './img/Logo-Semitransparent.png';
import './styles/App.css';
import App from './App.js';

import firebase from './firebase'

var user;
var pass;
var pCon;
var ques;
var answ;
class CreateAccount extends Component {
	state = {
	    data     : null,
        userName : null,
        passWord : null,
        secQuest : null,
        secAns   : null,
        accMade  : false,
        errors : {
	      userName : '',
          passWord : '',
          passConf : '',
          secQuest : '',
          secAns   : ''
        }
	};


	// validity check for user inputs
    handleChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        let errors = this.state.errors;

        switch (name) {
            case 'userName' :
                errors.userName =
                    value.length < 5
                ? 'User Name must be at least 5 characters long'
                        : '';
                break;
            case 'passWord' :
                errors.passWord =
                    value.length < 8
                ? 'Password must be at least 8 characters long'
                        : '';
                break;
                /*
            case 'passConf' :
                errors.passConf =
                    value !== errors.passWord.value
                ? 'passwords must match'
                        : '';
                break;
                 */
            case 'secQuest' :
                errors.secQuest =
                    value.length < 12
                ? 'Security Question must be at least 12 characters long'
                        : '';
                break;
            case 'secAns' :
                errors.secAns =
                    value.length === 0
                ? 'Security Answer cannot be empty'
                        : '';
                break;
            default :
                break;
        }

        this.setState({errors, [name]: value});
    }

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
	    // Inputs by user
        user = document.getElementById('userN').value;
        pass = document.getElementById('passW').value;
        pCon = document.getElementById('passC').value;
        ques = document.getElementById('q').value;
        answ = document.getElementById('ans').value;

        if (pass === pCon && user.length < 5 && pass.length < 8
        && ques.length < 12 && answ.length !== 0) {
            this.setState({
                accMade: true
            })
        }
	}

  	render() {
		const login = this.state.accMade

		if(login) {
            return (
			  <App/>	
 	   	);
		}
		else {
		    const {errors} = this.state;
			return <div style={{backgroundColor: '#d6f3ff', height: 1000}}>
                <div style={styles.centerDiv}>
                    <img src={logo} style={{width: 100, height: 100}}/>
                    <h1>Create Account</h1>
                </div>

                <div className='userName' style={styles.centerDiv}>
                    <label>Username:</label>
                    <input type="text" name='userName' id="userN"
                    onChange={this.handleChange} />
                    {errors.userName.length > 0 &&
                    <span className='error'>
                        {errors.userName}</span>}
                </div>

                <div className='passWord' style={styles.centerDiv}>
                    <label>Password:</label>
                    <input type="password" name='passWord' id="passW"
                    onChange={this.handleChange} />
                    {errors.passWord.length > 0 &&
                    <span className='error'>
                        {errors.passWord}</span>}
                </div>

                <div className='passConf' style={styles.centerDiv}>
                    <label>Confirm Password:</label>
                    <input type="password" name='passConf' id="passC"
                    onChange={this.handleChange} />
                    {errors.passConf.length > 0 &&
                    <span className='error'>
                        {errors.passConf}</span>}
                </div>

                <div className='secQuest' style={styles.centerDiv}>
                    <label>Security Question:</label>
                    <input type="text" name='secQuest' id="q"
                    onChange={this.handleChange} />
                    {errors.secQuest.length > 0 &&
                    <span className='error'>
                        {errors.secQuest}</span>}
                </div>

                <div className='secAns' style={styles.centerDiv}>
                    <label>Security Question Answer:</label>
                    <input type="text" name='secAns' id="ans"
                    onChange={this.handleChange} />
                    {errors.secAns.length > 0 &&
                    <span className='error'>
                        {errors.secAns}</span>}
                </div>

                <div style={styles.centerDiv}>
                    <button class= 'login_button' style={styles.allButton} onClick={this.made.bind(this)}>
                        Create Account
                    </button>
                </div>
            </div>;
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
