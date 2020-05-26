import React, { Component } from 'react';
import './styles/App.css';


class Planned extends Component {

    constructor(props){
        super(props)
        this.state={
            events: [
                {id: 1, eventName: 'Event #1', hostName: 'Host 1', eventDate: 'MM/DD/YYYY', eventTime: 'HH:MM'},
                {id: 2, eventName: 'Event #2', hostName: 'Host 2', eventDate: 'MM/DD/YYYY', eventTime: 'HH:MM'},
                {id: 3, eventName: 'Event #3', hostName: 'Host 3', eventDate: 'MM/DD/YYYY', eventTime: 'HH:MM'},
                {id: 4, eventName: 'Event #4', hostName: 'Host 4', eventDate: 'MM/DD/YYYY', eventTime: 'HH:MM'},

            ]
        }
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
        );
    }
}


export default Planned
