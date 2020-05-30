import React, { Component } from 'react';
import './App.css';
import logo from './img/Logo-Semitransparent.png';

class Following extends Component {

    render() {

        const FollowedHostData = [
            {Hosts: 'Host #1'},
            {Hosts: 'Host #2'},
            {Hosts: 'Host #3'},
            {Hosts: 'Host #4'},
            {Hosts: 'Host #5'}

        ];
        
        return (
            <div>
                <div style={{ backgroundColor: '#cccccc', height: 1500 }}>
                    <div style={styles.centerDiv}>
                        <a href="/calendar"><img src={logo} style={{ width: 100, height: 100 }} /></a>
                        <a href="/calendar"><h1 style={{ width: 500 }}>CLNDR</h1></a>
                        <input type="text" style={{ width: 180 }} />
                        <button class = 'login_button' style={{ width: 95 }}>Search</button>
                    </div>

                    <div style={styles.centerDiv}>
                        <a href="/calendar">
                            <button class = 'login_button' style={styles.allButton}>
                                View Calendar
                            </button>
                        </a>
                        <a href="/planned">
                            <button class = 'login_button' style={styles.allButton}>
                                Planned Events
                            </button>
                        </a>
                        <a href="/following">
                            <button class = 'login_button' style={styles.allButton}>
                                Following
                            </button>
                        </a>
                        <a href="/account">
                            <button class = 'login_button' style={styles.allButton}>
                                Account
                            </button>
                        </a>
                        <a href="/createevent">
                            <button class = 'login_button' style={styles.allButton}>
                                Create Event
                            </button>
                        </a>
                    </div>
                    <br />
                    <h1>Followed Hosts</h1>
                    <ul class="bulletedlist">
                        {FollowedHostData.map((item, index) => {
                            return <li>{item.Hosts}</li>;
                        })}
                    </ul>
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
export default Following;
