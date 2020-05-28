import React, { Component } from 'react';
import "./styles/CreateEventPage.css"

class CreateEvent extends Component {
    render(){
        return(
        <div>
            <h2 class="center">Create Event</h2>
            <form class="center create-event-form">
                <div class="form-input">
                    <label>Event Title:</label>
                    <input type="text" id="title" placeholder="Event Title"/>
                </div>

                <div class="date-time-grid">
                    <label>Start Date:</label><label>Start Time:</label>
                    <input type="date" id="start_date" /><input type="time" id="start_time" />
                </div>

                <div class="date-time-grid">
                    <label>End Date:</label><label>End Time:</label>
                    <input type="date" id="end_date" /><input type="time" id="end_time" />
                </div>

                <div class="form-input">
                    <label>Details:</label>
                    <textarea rows = "5" cols = "50" id="details" placeholder="Enter description here..."></textarea>
                </div>

                <div class="form-input">
                    <label>Keywords:</label>
                    <textarea rows = "3" cols = "50" id="details"></textarea>
                </div>

                <div class="form-input">
                    <label>Co-Hosts:</label>
                    <textarea rows = "1" cols = "50" id="details"></textarea>
                </div>

                <div class="form-input">
                    <label>Pictures or Videos</label>
                    <button type="button">Upload</button>
                </div>

                <br/><br/>
                <input type="submit" value="Submit"/>
                <input type="submit" value="Cancel"/>
            </form>
        </div>
        );
    }
}

export default CreateEvent;