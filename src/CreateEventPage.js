
import React, { Component } from 'react';
import "./styles/App.css"
import logo from './img/Logo-Semitransparent.png';
import NavBar from "./NavBar";
import axios from "axios";
import { Timestamp } from '@google-cloud/firestore';

class CreateEvent extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
        title:"",
        startDate:"",
        endDate:"",
        startTime:"",
        endTime:"",
        description:"",
        keywords:"",
        cohosts:"",
        //implements
        imageURL:"",
        userID: null,
        username: null,
        email: null,
        accountLevel: null,
        guest: true
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    }

  /*Get Account Details*/
  componentDidMount = () =>{
    let userToken = localStorage.getItem('jwtToken');
	if (userToken === null) {
	 this.setState({
	        userID: "log in for this",
	    });
	}
	else {
    axios.get('http://localhost:5000/accountInfo', {
      headers: { Authorization: 'JWT ' + userToken },
    })
    .then(response => {
      if(response.data.success){
      this.setState({
	  userID: response.data.id,
      });
      console.log(this.state.userID);
      }
      else{}
    })
    .catch(error => {
      console.log(error.data);
    });
  }
}

    handleInputChange(event) {
        this.setState({
          [event.target.name]: event.target.value
        });
      }


    handleClick = () => {
        console.log("hehe"); 
        /* CONTROLLER CALL */
        var title = this.state.title;
        var startDate = this.state.startDate;
        var startTime = this.state.startTime;
        var endDate = this.state.endDate;
        var endTime = this.state.endTime;
        var description = this.state.description;
        var keywords = this.state.keywords;
        var cohosts = this.state.cohosts;
        var imageUrl = this.state.imageURL;
        var hostID = this.state.userID;

        console.log(hostID);

        /* make a post request with the new tutor we are adding */
        let config = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title,
                hostID,
                startDate,
                startTime,
                endDate,
                endTime,
                description,
                keywords,
                cohosts,
                imageUrl
            })
        };
    
        /* make the server call, which will make the database call to add the new tutor to the tutors list */
        fetch('http://localhost:5000/CreateEventPage', config).catch(error => console.log(error));
    
        /* END OF CONTROLLER CALL */
}


    render(){
        const {title, startDate, startTime, endDate, endTime, description, keywords, cohosts,imageURL} = this.state;

        return(
        <div>
            <div style={{ backgroundColor: '#d6f3ff', height: 1500 }}>

            <NavBar/>

            <br />
            <h1 class="center">Create Event</h1>
            <form class="center create-event-form">
                <div class="form-input">
                    <label>Event Title:</label>
                    <input onChange={this.handleInputChange} type="text" name="title" id="title" placeholder="Event Title"/>
                </div>

                <div class="date-time-grid">
                    <label>Start Date:</label><label>Start Time:</label>
                    <input onChange={this.handleInputChange} name="startDate" type="date" id="start_date" /><input type="time" onChange={this.handleInputChange} name="startTime" id="start_time" />
                </div>

                <div class="date-time-grid">
                    <label>End Date:</label><label>End Time:</label>
                    <input onChange={this.handleInputChange} name="endDate" type="date" id="end_date" /><input type="time" onChange={this.handleInputChange} name="endTime" id="end_time" />
                </div>

                <div class="form-input">
                    <label>Details:</label>
                    <textarea onChange={this.handleInputChange} name="description" rows = "5" cols = "50" id="details" placeholder="Enter description here..."></textarea>
                </div>

                <div class="form-input">
                    <label>Keywords:</label>
                    <textarea onChange={this.handleInputChange} name="keywords" rows = "3" cols = "50" id="details"></textarea>
                </div>

                <div class="form-input">
                    <label>Co-Hosts:</label>
                    <textarea onChange={this.handleInputChange} name="cohosts" rows = "1" cols = "50" id="details"></textarea>
                </div>

                <div class="form-input">
                    <label>Pictures or Videos</label>
                    <input onChange={this.handleInputChange} type="text" name="imageURL" id="title" placeholder="Image URL"/>
                </div>

                <br/><br/>
                <input style={styles.allButton} type="submit" onClick={this.handleClick} value="Submit"/>
	
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
      width: 100
    }
  };
  
export default CreateEvent;
