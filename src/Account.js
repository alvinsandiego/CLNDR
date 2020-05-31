import React, { Component } from 'react';

import './styles/App.css';
import axios from "axios";
import EventPage from "./EventPage";
import CreateEventPage from "./CreateEventPage";
import EditAccountInfo from "./EditAccountInfo";

import { Button } from 'reactstrap';
import logo from './img/Logo-Semitransparent.png';
import NavBar from "./NavBar";

class Account extends Component {
    constructor(props) {
        super(props);



        const userID = this.props.userID;

        this.state = {

         
            userID: "user1",
            viewForm: false,
            username: "user1",
            accountLevel: "User",
            email: "user1@gmail.com",

            deleteText: "Delete My Account",
            editAccount: "false"
        };
    }


    /*Get Account Details*/
    componentDidMount = () =>{
        axios.get("http://localhost:5000/userInfoe?userID="+this.state.userID).then(response => {
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
        if(this.state.deleteText == "Delete My Account"){
            this.setState({deleteText: "Confirm Delete Account"})
        }
        else{
            axios.post("http://localhost:5000/DeleteAccount?userID="+this.state.userID)
        }

    }


    handleLogout(){
        localStorage.clear()
        /* Redirect to login*/
    }


    handleApplyForVerification(){
        axios.post("http://localhost:5000/applyForVerification?userID="+this.state.userID)

    }






    render() {



        return (
		<div style={{ backgroundColor: '#d6f3ff', height: 1500 }}>

                <NavBar/>
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>





		<h1>Account Page</h1>

		</div>
        <div class='profileInfo'>
            <p>Username: {this.state.username}</p><br/>
            <p>Email: {this.state.email}</p><br/>
            <p>Account Level: {this.state.accountLevel}</p><br/>

            <button className="control_button" onClick = {() => this.handleEditAccountInfo()}>Edit Account Info</button>

        </div>
            <br />
            <div value="withConfirm"style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <button class = "control_button" onClick = {() => this.handleLogout()}>Log Out</button>{' '}
                </div>
		<br />	
		<div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <button class = "control_button" onClick = {() => this.handleApplyForVerification()}>Apply For Verification</button>{' '}
		</div> 
		<br />
                <div value="withConfirm2"style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <button class = "control_button" onClick = {() => this.handleDeleteAccount()}>{this.state.deleteText}</button>{' '}
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
export default Account;
