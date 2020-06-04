import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import './styles/App.css';
import axios from "axios";
import EventPage from "./EventPage";
import CreateEventPage from "./CreateEventPage";
import EditAccountInfo from "./EditAccountInfo";

import { Button } from 'reactstrap';
import logo from './img/Logo-Semitransparent.png';
import NavBar from "./NavBar";
import Root from "./Root";

class Account extends Component {
  constructor(props) {
  super(props);
  this.state = {
    username: null,
    email: null,
    accountLevel: null,
    guest: true,
    verified: false
  }
	}


    /*Get Account Details*/
  componentDidMount = () =>{
    let userToken = localStorage.getItem('jwtToken');
	if (userToken === null) {
		this.setState({
			userID: "log in for this",
      viewForm: "log in for this",
      username: "log in for this",
      accountLevel: "log in for this",
      email: "log in for this",
      deleteText: "Delete My Account",
      editAccount: "false",
      guest: true
		});
	}
	else {
    axios.get('http://localhost:5000/accountInfo', {
      headers: { Authorization: 'JWT ' + userToken },
    })
    .then(response => {
      if(response.data.success){
      this.setState({
			userID: response.data.id,
      viewForm: "log in for this",
      username: response.data.data.username,
      accountLevel: "registered",
      email: "emial bois",
      deleteText: "Delete My Account",
      editAccount: "false",
      guest: false,
      verified: response.data.data.verified
      });
      }
      else{}
    })
    .catch(error => {
      console.log(error.data);
    });
  }
  }



    handleDeleteAccount(){
        if(this.state.deleteText == "Delete My Account"){
            this.setState({deleteText: "Confirm Delete Account"})
        }
        else{
            //axios.post("http://localhost:5000/DeleteAccount?userID="+this.state.userID)
            alert("Account deleted!")
            localStorage.clear()
            this.setState({deleteText: "Confirm Delete Account"})
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
    if(this.state.verified){
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
            <a href="/editaccountinfo"><button className="control_button">Edit Account Info</button></a>
        </div>
        <br />
        <div value="withConfirm"style={styles.centerDiv}>
          <a href="/">
            <button class = "control_button" onClick = {() => this.handleLogout()}>
              Log Out
            </button>{' '}
          </a>
        </div>
		    <br /><br /><br /><br /><br /><br /><br /><br />
		    <br />
        <div value="withConfirm2"style={styles.centerDiv}>
          <button class = "control_button" onClick = {() => this.handleDeleteAccount()}>{this.state.deleteText}
          </button>{' '}
        </div>
        </div>
      );
    }
    else if(!this.state.guest) {
      return(
		    <div style={{ backgroundColor: '#d6f3ff', height: 1500 }}>
          <NavBar/>
          <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
		      <h1>Account Page</h1>
		    </div>
        <div class='profileInfo'>
            <p>Username: {this.state.username}</p><br/>
            <p>Email: {this.state.email}</p><br/>
            <p>Account Level: {this.state.accountLevel}</p><br/>
            <a href="/editaccountinfo"><button className="control_button">Edit Account Info</button></a>
        </div>
        <br />
        <div value="withConfirm"style={styles.centerDiv}>
          <a href="/">
            <button class = "control_button" onClick = {() => this.handleLogout()}>
              Log Out
            </button>{' '}
          </a>
        </div>
		    <br />	
		    <div style={styles.centerDiv}>
		      <a href="/verification" >
            <button class = "control_button">
              Apply For Verification
            </button>
		      </a>
		    </div> 
		    <br /><br /><br /><br /><br /><br /><br /><br /><br />
        <div value="withConfirm2"style={styles.centerDiv}>
          <button class = "control_button" onClick = {() => this.handleDeleteAccount()}>{this.state.deleteText}
          </button>{' '}
        </div>
        </div>
      );
    }
    else {
      return(
		    <div style={{ backgroundColor: '#d6f3ff', height: 1500 }}>
          <NavBar/>
          <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
		        <h1>Account Page</h1>
		      </div>
          <br />
          <div value="withConfirm"style={styles.centerDiv}>
            <a href="/createaccount">
              <button class = "control_button" onClick = {() => this.handleLogout()}>
                Make an Account
              </button>{' '}
            </a>
          </div>
		      <br />	
		      <div style={styles.centerDiv}>
		      </div> 
		      <br />
          <div value="withConfirm2"style={styles.centerDiv}>
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
export default Account;
