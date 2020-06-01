import React, { Component } from 'react';
import logo from './img/Logo-Semitransparent.png';
import './styles/App.css';
import App from './App.js';

import firebase from './firebase'
import EventPage from "./EventPage";
import axios from "axios";

var secAns;
var newPass;
var confPass;

class ForgotPassword extends Component {

    constructor(props) {
        super(props);

        const eventID = this.props.username;


        this.state = {
            data: null,
            changeDone: false,
            username:"21",
            securityQuestion:"What is 9+10",
            accMade : false,
            secAnsError: 'Security Answer cannot be empty',
            passError: 'Password must be at least 8 characters'

        };

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



    componentDidMount = () =>{
        axios.get("http://localhost:5000/userInfo?username="+this.props.username).then(response => {
            this.setState({
                securityQuestion: response.data.sec_question
            })
        });
    };


    handleForgotPass(){
        secAns = document.getElementById('secQ').value;
        newPass = document.getElementById('newP').value;
        confPass = document.getElementById('conP').value;

        if(newPass.length !==0 && confPass.length !==0
            && newPass.length < 8 && secAns.length !==0 &&
            newPass == confPass){
            this.setState({
                accMade: true
            })

            axios.post("http://localhost:5000/login",
                {
                    securityAns: secAns,
                    newPassword: newPass

                })
        }
    }


    handleChange = () => {
        var secAns = document.getElementById('secQ').value;
        var newPass = document.getElementById( 'newP').value;
        var confPass = document.getElementById( 'conP').value;

        if(secAns.length==0){
            this.setState({secAnsError: 'Security Answer cannot be empty'})
        }
        else{
            this.setState({secAnsError: ''})
        }

        if(newPass.length<8){
            this.setState({passError: 'Password must be at least 8 characters'})
        }
        else{
            this.setState({passError: ''})
        }


    }




    render() {
        const confirm = this.state.accMade

        if(confirm) {
            return (
                <App/>
            );
        }
        else{
            const {errors} = this.state;
            return (
                <div style={{backgroundColor: '#d6f3ff', height: 1000}}>
                    <div style= {styles.centerDiv}>
                        <img src={logo} style= {{width: 100, height: 100}}/>
                        <h1>Forgot Password</h1>
                    </div>
                    <div class='events'>

                    <div class='left'>
                        <label>Username: {this.state.username}</label>
                    </div>
                    <div class='left'>
                        <label>Security Question:&nbsp;{this.state.securityQuestion}</label>
                    </div>

                    <div class='left'>
                        <label>Security Question Answer:&nbsp;</label>
                        <input type="text" name='secQuestion' id="secQ"
                               onChange={this.handleChange}/>
                    </div>

                    <div class='left'>
                        <label>New Password:&nbsp;</label>
                        <input type="password" name='newPassword' id="newP"
                               onChange={this.handleChange}/>
                    </div>

                    <div class='left'>
                        <label>Confirm New Password:&nbsp;</label>
                        <input type="password" name="confirmPass" id="conP"/>
                    </div>

                        <div class='left'>
                            <b>{this.state.secAnsError}</b>
                        </div>
                        <div class='left'>
                            <b>{this.state.passError}</b>
                        </div>

                </div>


                    <div style={styles.centerDiv}>
                        <button class='control_button' onClick={this.handleForgotPass.bind(this)}>
                            Confirm
                        </button>
			<a href= "/">
				<button class='control_button'>
					Go Back
				</button>
			</a>
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




export default ForgotPassword;
