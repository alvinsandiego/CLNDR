import React, { Component } from 'react';
import logo from './img/Logo-Semitransparent.png';

class Planned extends Component {

    constructor(props){
        super(props)
        this.state={
            events: []
        }
    }

    componentDidMount() {
        this.setData();
    }

    setData() {
        /**
         * Code for Complete Implementation :
         * let newEvents = this.state.events.slice();
         * let ids = getId();       // store ids in array
         * 
         * for (i = 0; i < ids.length; i += 1) {
         *  let plEvent = getPlannedEvent(ids[i]);
         *  newEvents.push({
         * id: plEvent.id,
         * eventName: plEvent.eventName,
         * hostName: plEvent.hostName,
         * eventDate: plEvent.eventDate,
         * eventTime: plEvent.eventTime}) 
         * }
         */

        // Place Holders
        let ids = [0, 1, 2, 3, 4, 5]
        let eventNames = ['Event #1', 'Event #2', 'Event #3', 'Event #4', 'Event #5', 'Event #6']
        let hostNames = ['ab', 'bc', 'cd', 'de', 'ef', 'fg']
        let dates = ['MM/DD/YYYY', 'MM/DD/YYYY', 'MM/DD/YYYY', 'MM/DD/YYYY', 'MM/DD/YYYY', 'MM/DD/YYYY']
        let times = ['HH:MM', 'HH:MM', 'HH:MM', 'HH:MM', 'HH:MM', 'HH:MM']
        
        // Implementation
        let newEvents = this.state.events.slice();
        for (let i = 0; i < 6; i += 1) {
            newEvents.push({id: ids[i], 
                    eventName: eventNames[i],
                hostName: hostNames[i],
            eventDate: dates[i],
        eventTime: times[i]})
        }

        this.setState({events : newEvents});
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
