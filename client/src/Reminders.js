import React, { Component } from 'react';

class Reminders extends Component {

    render() {

        const RemindersEvents = [
            {Events: 'Event #1 - MM/DD/YYYY'},
            {Events: 'Event #2 - MM/DD/YYYY'},
            {Events: 'Event #3 - MM/DD/YYYY'},
            {Events: 'Event #4 - MM/DD/YYYY'},
            {Events: 'Event #5 - MM/DD/YYYY'}

        ];
        
        return (
            <div>
                <h1>Reminders</h1>
                <ul class="bulletedlist">
                    {RemindersEvents.map((item, index) => {
                        return <li>{item.Events}</li>;
                    })}
                </ul>
            </div>
        );
    }
}

export default Reminders
