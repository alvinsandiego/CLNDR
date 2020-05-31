import React, { Component } from 'react';
import logo from './img/Logo-Semitransparent.png';
import './styles/App.css';
import Root from './Root';

class NavBar extends Component{
    render() {
        return(
            <div style={{ backgroundColor: '#d6f3ff'}}>
                <div style= {{display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'white'}}>
                    <img src={logo} style= {{width: 100, height: 100} }/>
                    <h1 style={{width: 500}}>CLN<span className="goldText">DR</span></h1>
                    <input type= "text" style= {{width: 180}}/>
                    <button style= {{width: 95}}>Search</button>
                </div>

                <div style={{backgroundColor: "#004d6e", textAlign:"center"}}>
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
            </div>
        )
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

export default NavBar