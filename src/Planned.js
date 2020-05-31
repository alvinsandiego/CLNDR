import React, { Component } from 'react';
import logo from './img/Logo-Semitransparent.png';
import Account from "./Account";
import axios from "axios";
import './styles/App.css';

class Planned extends Component {

    constructor(props){
        super(props)
        const userID = this.props.userID;

        this.state = {
            userID: "user1",
            events: [{
                id: "10",
                eventName: "asdfasdfasdf",
                hostName: "adfsasdf",
                eventDate: "adfsasdf",
                eventTime: "xxxxx"
            }],
            eventIDs: []
        }
    }


    componentDidMount = () => {
        axios.get("http://localhost:5000/Planned?userID=" + this.state.userID).then(response => {
            this.setState({
                eventIDs: response.data
            })
        });
    };




    componentDidMount() {
        this.setData();
    }

    setData() {

        let newEvents = this.state.events.slice();
        for (var i = 0; i < this.state.eventIDs.size(); i++) {

            var eventInfo = axios.get("http://localhost:5000/EventPage?eventID=" + this.state.eventIDs[i])


            newEvents.push({
                id: i,
                eventName: eventInfo.eventName,
                hostName: eventInfo.hostName,
                eventDate: eventInfo.eventDate,
                eventTime: eventInfo.eventTime
            })


        }
        this.setState({events: newEvents});

    }

    renderTableData(){
        return this.state.events.map((event, index) => {
            const {id, eventName, hostName, eventDate, eventTime} = event
            return (
                <tr class="events" key={id}>
                    <td>{id}</td>
                    <td>{eventName}</td>
                    <td>{hostName}</td>
                    <td>{eventDate}</td>
                    <td>{eventTime}</td>
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

                    <div style={{backgroundColor: "#004d6e", textAlign: "center"}}>
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
                    <div class="events">
                        <div class = "events2">
                    <body>
                    <h2>Planned Events</h2>

                    <table class="events" id="events">
                        <th>No.</th>
                        <th>Event</th>
                        <th>Host</th>
                        <th>Date</th>
                        <th>Time</th>
                        <tbody>
                        {this.renderTableData()}
                        </tbody>
                    </table>

                    </body>
                    </div>
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

Account.defaultProps = {UserID: new String}


export default Planned