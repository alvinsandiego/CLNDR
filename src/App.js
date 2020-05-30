import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import logo from './img/Logo-Semitransparent.png';
import './styles/App.css';
import Page from './Page';
import ForgotPassword from './ForgotPassword';
import CreateAccount from './CreateAccount';


import firebase from './firebase'

class App extends Component {
	state = {
   	data: null,
		signin: false,
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
	goIn() {
		this.setState({
			signin: true
		})	
	}

  	render() {
		const login = this.state.signin
		if(!login) {
    		return (
				<div style={{backgroundColor: '#d6f3ff', height: 1000}}>
					<div style= {styles.centerDiv}>
						<img src={logo} style= {{width: 100, height: 100}}/>
        				<h1>Login</h1>
					</div>
            	<br />
					<div style= {styles.centerDiv}>
      	     		<h3>Returning Member</h3>
					</div>					
					<div style= {styles.centerDiv}>
						<label>Username</label>
        	   		<input />
        	   	</div>
					<br />
        	   	<div style= {styles.centerDiv}>
						<label>Password</label>
        	   		<input />
					</div>
					<br /> 
					<div style= {styles.centerDiv}>
						<button class = "login_button" style= {{width: 130}} >Login</button>
						<a href="/forgotpassword">
       						<button class = "login_button" style= {{width: 130}}>Forgot Password</button>
						</a>
        	   	</div>
				   <br />
            	<br />
     		    	<div style= {styles.centerDiv}>
						<h3>Prospective Member</h3>	            
					</div>
					<div style= {styles.centerDiv}>
						<p>To enjoy full personalized benefits of CLNDR, sign up for an account.</p>
	            </div>
					<div style= {styles.centerDiv}>
						<a href="/createaccount">
							<button class = "login_button" >Create Account</button>
						</a>
               </div>
					<br />
               <br />
	            <div style= {styles.centerDiv}>
						<h3>Guest</h3>
					</div>
	            <div style= {styles.centerDiv}>
						<p>To simply explore scheduled events, continue as guest.</p>
	            </div>
					<div style= {styles.centerDiv}>
						<button class = "login_button" onClick= {this.goIn.bind(this)}>Continue as Guest</button>
				   </div>
					<br />
         	</div>
 	   	);
		}
		else if(login) {
			return (
				<Page/>
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

export default App;
