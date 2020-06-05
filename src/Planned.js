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
            events: []
        }
    }


    componentDidMount = () => {
        const userToken = localStorage.getItem('jwtToken');
        if (userToken !== null) {
            axios.get("http://localhost:5000/planned",
            {
                headers: { Authorization: 'JWT ' + userToken }
            }).then(response => {
                if (response.data.success) {
                    this.setState({
                        events: response.data.data
                    });
                }
            });
        }
    };

    static dateString(date) {
        return date.toLocaleString('default');
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
        return (
            <tbody>
            {this.state.events.map((event, index) => {
                const {id, name, hostName, description, start, end, hostID} = event;
                const startDate = Planned.dateString(new Date(start * 1000));
                const endDate = Planned.dateString(new Date(end * 1000));

                return (
                    <tr class="events" key={id}>
                        <td><a href={'/eventpage/'+id}>{name}</a></td>
                        <td><a href={'/hostpage/'+hostName}>{hostName}</a></td>
                        <td>{startDate}</td>
                        <td>{endDate}</td>
                    </tr>
                )
            })}
            </tbody>
        );
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
                        <th>Event Name</th>
                        <th>Host</th>
                        <th>Start Date/Time</th>
                        <th>End Date/Time</th>
                        {this.renderTableData()}
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
