import React, { Component } from 'react';
import './styles/App.css';
class Account extends Component {
    constructor(props) {
        super(props);

        this.state = {
            viewForm: false,
            username: "user1",
            accountLevel: "Verified",
            hostid: "h17264",
            email: "user1@gmail.com"
        };
    }

    render() {
        var hostId = ""

        if(this.state.accountLevel == "Verified"){
            hostId = "Host ID: "+this.state.hostid
        }


        return (
		<div>
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
		<h1>Account Page</h1>

		</div>
        <div class='profileInfo'>
            <p>Username: {this.state.username}</p><br/>
            <p>Email: {this.state.email}</p><br/>
            <p>Account Level: {this.state.accountLevel}</p><br/>
            <p>{hostId}</p><br/>

            <button className="control_button">Edit Account Info</button>

        </div>
            <br />
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
