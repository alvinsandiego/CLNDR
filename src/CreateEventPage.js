
import React, { Component } from 'react';
import "./styles/App.css"
import logo from './img/Logo-Semitransparent.png';

class CreateEvent extends Component {
    
    constructor(props) {
        super(props)

        this.state = {title:'Name',startDate:'00',endDate:'00',startTime:'00',
                        endTime:'00',description:'00',
                        keywords:'00',cohosts:'00'};
        this.setTitle = this.setTitle.bind(this);
       /* this.setStartDate=this.setStartDate.bind(this);
        this.setEndDate = this.setEndDate.bind(this);
        this.setStartTime = this.setStartTime.bind(this);
        this.setEndTime = this.setEndTime.bind(this);
        this.setEventDescription = this.setEventDescription.bind(this);
        this.setEventKeywords = this.setEventKeywords.bind(this);
        this.setCohosts = this.setCohosts.bind(this); */
    }
     
    setTitle(e){
        e.preventDefault();
        console.log(e.target.value);
        this.setState({
            title:e.target.value
        })
        console.log(e.target.value);
    }
    /*
    handleClick = () => {
        console.log("hehe");
        /* CONTROLLER CALL 
        var title = this.state.title;
        var startDate = this.state.startDate;
        var startTime = this.state.startTime;
        var endDate = this.state.endDate;
        var endTime = this.state.endTime;
        var description = this.state.description;
        var keywords = this.state.keywords;
        var cohosts = this.state.cohosts; 


        /* make a post request with the new tutor we are adding 
        let config = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title,
                startTime,
                endDate,
                endTime,
                description,
                keywords,
                cohosts
            })
        };
    
        /* make the server call, which will make the database call to add the new tutor to the tutors list 
         fetch('http://localhost:5000/CreateEventPage', config).catch(error => console.log(error));
    
        /* END OF CONTROLLER CALL 
} */

    render(){
        return(
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
            <h1 class="center">Create Event</h1>
            <form class="center create-event-form">
                <div class="form-input">
                    <label>Event Title:</label>
                    <input onChange={this.setTitle} type="text" id="title" placeholder="Event Title"/>
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
                <input type="submit" onClick={this.handleClick} value="Submit"/>
                <input type="submit" value="Cancel"/>
            </form>
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
  
export default CreateEvent;
