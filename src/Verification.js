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

        this.state = {
            applicationExists: false,
            applicationError: '',
            emailError: '',
            orgNameError: '',
            profilePicURLError: ''
        };

    };


    handleVerify () {
        email = document.getElementById('email').value;
        org = document.getElementById('oName').value;
        pic = document.getElementById('pic').value;
        let userToken = localStorage.getItem('jwtToken');
        if (userToken === null) {
            this.setState({applicationError: "You are not logged in."});
            return;
        }

        if(email.length > 0 && org.length > 0 && pic.length > 0){            
            axios.post("http://localhost:5000/requestVerification",
            {
                contact_email: email,
                org_name: org,
                profile_pic_url: pic
            },
            {
                headers: { Authorization: 'JWT ' + userToken },
            }
            ).then(response => {
                if (response.data.success) {
                    alert("Sweet! Your application has been submitted.");
                    this.props.history.push('/account');
                }
                else {
                    this.setState({applicationError: response.data.message});
                }
            });
        }
        else {
            this.validateFields();
        }
    }

    validateFields() {
        var email = document.getElementById('email').value;
        var org = document.getElementById( 'oName').value;
        var pic = document.getElementById( 'pic').value;

        if (email.length === 0) {
            this.setState({emailError: 'Please enter an email'})
        }
        else {
            this.setState({emailError: ''})
        }

        if (org.length === 0) {
            this.setState({orgNameError: 'Please enter an organization name'})
        }
        else {
            this.setState({orgNameError: ''})
        }

        if (pic.length === 0) {
            this.setState({profilePicURLError: 'Please provide a profile picture URL'})
        }
        else {
            this.setState({profilePicURLError: ''})
        }
    }

    handleChange = () => {
        this.validateFields()
    }

    render() {
        const {errors} = this.state;
        if (this.state.applicationExists) {
            return (
                <div></div>
            );
        }

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

                {this.state.applicationError.length > 0 && 
                    <div class='left'>
                        <b>{this.state.applicationError}</b>
                    </div>
                }

                {this.state.emailError.length > 0 && 
                    <div class='left'>
                        <b>{this.state.emailError}</b>
                    </div>
                }

                {this.state.orgNameError.length > 0 &&
                    <div class='left'>
                        <b>{this.state.orgNameError}</b>
                    </div>
                }

                {this.state.profilePicURLError.length > 0 &&
                    <div class='left'>
                        <b>{this.state.profilePicURLError}</b>
                    </div>
                }
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


EventPage.defaultProps = {username: new String}

export default Verification;
