import React, { Component } from 'react';
import { Button } from 'reactstrap';
import logo from './img/Logo-Semitransparent.png';
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
                <div style={{ backgroundColor: '#cccccc', height: 1500 }}>
                    <div style={styles.centerDiv}>
                        <a href="/calendar"><img src={logo} style={{ width: 100, height: 100 }} /></a>
                        <a href="/calendar"><h1 style={{ width: 500 }}>CLNDR</h1></a>
                        <input type="text" style={{ width: 180 }} />
                        <button class = "control_button" style={{ width: 95 }}>Search</button>
                    </div>

                    <div style={styles.centerDiv}>
                        <a href="/calendar">
                            <button class = "control_button" style={styles.allButton}>
                                View Calendar
                            </button>
                        </a>
                        <a href="/planned">
                            <button class = "control_button" style={styles.allButton}>
                                Planned Events
                            </button>
                        </a>
                        <a href="/following">
                            <button class = "control_button" style={styles.allButton}>
                                Following
                            </button>
                        </a>
                        <a href="/account">
                            <button class = "control_button" style={styles.allButton}>
                                Account
                            </button>
                        </a>
                        <a href="/createevent">
                            <button class = "control_button" style={styles.allButton}>
                                Create Event
                            </button>
                        </a>
                    </div>
                    <br />
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <h1>Account Page</h1>
                    </div>
                    <div value="withConfirm" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <a href="/"><Button class = "control_button" color="#f194ff" style={{ height: 50, width: 150 }}> Log Out</Button>{' '}</a>
                    </div>
                    <br />
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Button class = "control_button" value="NoConfirm" style={{ height: 50, width: 150 }}>Apply For Verification</Button>{' '}
                    </div>
                    <br />
                    <div value="withConfirm2" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Button class = "control_button" style={{ height: 50, width: 150 }}>Delete My Account</Button>{' '}
                    </div>
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
