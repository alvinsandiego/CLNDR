import React, { Component } from 'react';
import './styles/App.css'
import logo from './img/Logo-Semitransparent.png';
import Account from "./Account";
import axios from "axios";

class Following extends Component {

    constructor(props){
        super(props)
        const userID = this.props.userID;

        this.state = {
            userID: "user1",
            hostIDs: [],
            hostArray: []
        }
    }

    componentDidMount = () => {
        axios.get("http://localhost:5000/Following?userID=" + this.state.userID).then(response => {
            this.setState({
                hostIDs: response.data
            })
        });
    };


    componentDidMount() {
        this.setData();
    }

    setData() {

        let newHosts = this.state.hostArray.slice();
        for (var i = 0; i < this.state.hostIDs.size(); i++) {

            var hostInfo = axios.get("http://localhost:5000/userInfo?userID=" + this.state.hostIDs[i])


            newHosts.push({
                id: i,
                hostName: hostInfo.username,
                hostEmail: hostInfo.email
            })


        }
        this.setState({hostArray: newHosts});
    }

    renderTableData(){
        return this.state.hostArray.map((host, index) => {
            const {id, hostName, hostEmail} = host
            return (
                <tr class="hosts" key={id}>
                    <td>{id}</td>
                    <td>{hostName}</td>
                    <td>{hostEmail}</td>
                </tr>
            )
        })
    }


    render() {
        return (
            <div>
                <div style={{ backgroundColor: '#d6f3ff', height: 1500 }}>
                    <div style= {{display: 'flex',

                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'white'}}>
                        <img src={logo} style= {{width: 100, height: 100} }/>
                        <h1 style={{width: 500}}>CLN<span className="goldText">DR</span></h1>
                        <input type= "text" style= {{width: 180}}/>
                        <button style= {{width: 95}}>Search</button>

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
                    <body>

                    <h2>Followed Hosts</h2>

                    <table class="host">
                        <th>No.</th>
                        <th>Host</th>
                        <th>Email</th>
                        <tbody>
                        {this.renderTableData()}
                        </tbody>
                    </table>

                    </body>
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


Account.defaultProps = {UserID: new String}

export default Following;