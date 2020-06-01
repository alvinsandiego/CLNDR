import React, { Component } from 'react';
import logo from './img/Logo-Semitransparent.png';
import './styles/App.css';
import App from './App.js';

import firebase from './firebase'
import EventPage from "./EventPage";
import axios from "axios";

var email;
var org;
var pic;

class Verification extends Component {

    constructor(props) {
        super(props);

        const eventID = this.props.username;


        this.state = {
            data: null,
            changeDone: false,
            username:"21",
            securityQuestion:"What is 9+10",
            accMade : false,
            secAnsError: '',
            passError: '',
            confError: ''

        };

    };


    handleVerify(){
        email = document.getElementById('email').value;
        org = document.getElementById('oName').value;
        pic = document.getElementById('pic').value;

        

        if(email.length > 0 && org.length > 0 && pic.length > 0){

            alert("Sweet! Your application has been submitted.");

            this.setState({
                accMade: true
            })

            axios.post("http://localhost:5000/requestVerification",
                {
                    contact_email: email,
                    org_name: org,
                    profile_pic_url: pic

                })
        }
    }


    handleChange = () => {
        var email = document.getElementById('email').value;
        var org = document.getElementById( 'oName').value;
        var pic = document.getElementById( 'pic').value;

        if(email.length==0){
            this.setState({secAnsError: 'Please enter an email'})
        }
        else{
            this.setState({secAnsError: ''})
        }

        if(org.length==0){
            this.setState({passError: 'Please enter an organization name'})
        }
        else{
            this.setState({passError: ''})
        }

        if(pic.length==0){
            this.setState({confError: 'Please provide a profile picture URL'})
        }
        else{
            this.setState({confError: ''})
        }

    }




    render() {
        const confirm = this.state.accMade

        if(confirm) {
            return (
                //Kevin says he will fix this. k. sure.
                <App/>
            );
        }
        else{
            const {errors} = this.state;
            return (
                <div style={{backgroundColor: '#d6f3ff', height: 1000}}>
                    <div style= {styles.centerDiv}>
                        <img src={logo} style= {{width: 100, height: 100}}/>
                        <h1>Verification Application</h1>
                    </div>
                    <div class='events'>

                    <div class='left'>
                        <label>Contact Email:&nbsp;</label>
                        <input type="text" name='contEmail' id="email"
                               onChange={this.handleChange}/>
                    </div>

                    <div class='left'>
                        <label>Organization Name:&nbsp;</label>
                        <input type="text" name='orgName' id="oName"
                               onChange={this.handleChange}/>
                    </div>

                    <div class='left'>
                        <label>Profile Picture URL:&nbsp;</label>
                        <input type="text" name="profPic" id="pic"
                                onChange={this.handleChange}/>
                    </div>


                    <div style={styles.centerDiv}>
                        <button class='control_button' onClick={this.handleVerify.bind(this)}>
                            Confirm
                        </button>
			        <a href= "/">
				        <button class='control_button'>
					        Go Back
				        </button>
			        </a>
                        
                        
                    </div>

                    <div class='left'>
                            <b>{this.state.secAnsError}</b>
                        </div>
                        <div class='left'>
                            <b>{this.state.passError}</b>
                        </div>
                        <div class='left'>
                            <b>{this.state.confError}</b>
                        </div>

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


EventPage.defaultProps = {username: new String}

export default Verification;
