import React, { Component } from 'react';
import logo from './img/Logo-Semitransparent.png';
import Account from "./Account";
import axios from "axios";
import './styles/App.css';
import NavBar from "./NavBar";

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
                    <td><a href={"/viewEvent?id=" + id}>{eventName}</a></td>
                    <td><a href={"/viewHost?id=" + id}>{hostName}</a></td>
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

                    <NavBar/>


                    <br />
                    <div class="events">
                        <div class = "events2">
                    <body>
                    <h2>Planned Events</h2>
	                    
                    <div style={styles.centerDiv}>
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
                    </div>

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




export default Planned
