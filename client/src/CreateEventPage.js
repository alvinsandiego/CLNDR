import React, { Component } from 'react';
import "./styles/CreateEventPage.css"

class CreateEvent extends Component {
    render(){
        return(
        <div class="center">
            <h2 class="center">Create Event</h2>
            <form>
                <label>Event Title:</label>
                <input type="text" id="title" placeholder="Event Title"/><br/>

                <label>Time:</label>
                <input type="time" id="Time" /><br/>

                <label>date:</label>
                <input type="date" id="Date" /><br/>

                <label>Details:</label>
                <textarea rows = "5" cols = "50" id="details" placeholder="Enter description here..."></textarea><br/>

                <label>Keywords:</label>
                <textarea rows = "3" cols = "50" id="details"></textarea><br/>

                <label>Co-Hosts:</label>
                <textarea rows = "1" cols = "50" id="details"></textarea><br/>

                <label>pictures or videos</label>
                <button type="button">Upload</button>

                <br/><br/>
                <input type="submit" value="Submit"/>
                <input type="submit" value="Cancel"/>
            </form>
        </div>
        );
    }
}

export default CreateEvent;