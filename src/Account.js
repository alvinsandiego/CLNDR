import React, { Component } from 'react';
import './styles/App.css';
class Account extends Component {
    constructor(props) {
        super(props);

        this.state = {
            viewForm: false
        };
    }

    render() {
        return (
		<div>
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
		<h1>Account Page</h1>
		</div>
                <div value="withConfirm"style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <button class = "control_button"> Log Out</button>{' '}
                </div>
		<br />	
		<div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <button class = "control_button">Apply For Verification</button>{' '}
		</div> 
		<br />
                <div value="withConfirm2"style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <button class = "control_button">Delete My Account</button>{' '}
                </div>
                </div>

               );

    }
}

export default Account;
