import React, { Component } from 'react';
import './styles/App.css';
import axios from "axios";
import EventPage from "./EventPage";

class Account extends Component {
    constructor(props) {
        super(props);



        const userID = this.props.userID;

        this.state = {
            userID: "user1",
            viewForm: false,
            username: "user1",
            accountLevel: "User",
            email: "user1@gmail.com"
        };
    }


    /*Get Account Details*/
    componentDidMount = () =>{
        axios.get("http://localhost:5000/AccountPage?userID="+this.state.userID).then(response => {
            this.setState({
                username: response.data.username,
                email: response.data.email,
            })
        });

        /*Check if user is verified*/
        axios.get("http://localhost:5000/Verified?userID="+this.state.userID).then(response => {
            if(response.data==true){
                this.setState({accountLevel: "Verified"})
            }
        });
    };



    handleDeleteAccount(){

    }

    handleLogout(){

    }

    handleEditAccountInfo(){


    }






    render() {



        return (
		<div>
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
		<h1>Account Page</h1>

		</div>
        <div class='profileInfo'>
            <p>Username: {this.state.username}</p><br/>
            <p>Email: {this.state.email}</p><br/>
            <p>Account Level: {this.state.accountLevel}</p><br/>

            <button className="control_button">Edit Account Info</button>

        </div>
            <br />
            <div value="withConfirm"style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <button class = "control_button">Log Out</button>{' '}
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


Account.defaultProps = {UserID: new String}

export default Account;
