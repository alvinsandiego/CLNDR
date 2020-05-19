import React, { Component } from 'react';
import logo from './img/Logo-Transparent.png';
import './styles/App.css';
import CalendarView from './CalendarView';
import Page from './Page';

class App extends Component {
	state = {
   	data: null,
		signin: true
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
			signin: false
		})	
	}
	


  	render() {
		const login = this.state.signin

		if(login) {
    		return (
				<div style={{backgroundColor: '#cccccc', height: 1000}}>
					<div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
						<img src={logo} style= {{width: 100, height: 100}}/>
        				<h1>Login</h1>
					</div>
            	<br />
					<div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      	     		<h3>Returning Member</h3>
					</div>					
					<div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
						<label>Username</label>
        	   		<input />
        	   	</div>
					<br />
        	   	<div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
						<label>Password</label>
        	   		<input />
					</div>
					<br /> 
					<div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
						<button style= {{width: 130}} >Login</button>
       				<button style= {{width: 130}} >Forgot Password</button>
        	   	</div>
				   <br />
            	<br />
     		    	<div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
						<h3>Prospective Member</h3>	            
					</div>
					<div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
						<p>To enjoy full personalized benefits of CLNDR, sign up for an account.</p>
	            </div>
					<div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
						<button>Create Account</button>
               </div>
					<br />
               <br />
	            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
						<h3>Guest</h3>
					</div>
	            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
						<p>To simply explore scheduled events, continue as guest.</p>
	            </div>
					<div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
						<button onClick= {this.goIn.bind(this)}>Continue as Guest</button>
				   </div>
					<br />
         	</div>
 	   	);
		}
		else {
			return (
				<Page/>
			);
		}
  }
}

export default App;
