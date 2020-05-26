import React, { Component } from 'react';
import '../styles/App.css';
class Planned extends Component {

    render() {

        const PlannedEvents = [
            {Events: 'Event #1 - MM/DD/YYYY'},
            {Events: 'Event #2 - MM/DD/YYYY'},
            {Events: 'Event #3 - MM/DD/YYYY'},
            {Events: 'Event #4 - MM/DD/YYYY'},
            {Events: 'Event #5 - MM/DD/YYYY'}

        ];
        
        return (
            <div>
                <h1>Planned Events</h1>
                <ul class="bulletedlist">
                    {PlannedEvents.map((item, index) => {
                        return <li>{item.Events}</li>;
                    })}
                </ul>
            </div>
        );
    }
}

export default Planned
