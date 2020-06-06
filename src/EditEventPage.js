import React, { Component } from 'react';
import "./styles/App.css"
import logo from './img/Logo-Semitransparent.png';
import NavBar from "./NavBar";
import axios from "axios";
import { Timestamp } from '@google-cloud/firestore';
var hostId;
class EditEventPage extends Component {
    /*Well, in this context, we don't really need
    to create completely new ones, right? We should be
    getting it from the PREVIOUS one(probably not even
    using a constructor

    In spite of this though, EditAccountInfo.js seems to have
    a very nulled state in spite of this
    */
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
        guest: true //Will keep true for now
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    }
	
  /*Get Account Details*/
  
  /*  
    Is userToken is null, that means that it is definitely not logged in.

    But we won't need to check that. We'll strictly need to check if the
    user's accountLevel is set to null. Not being null means being a host
    (most likely; unless there is anything else that is missing)
  */
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
        /*-------------------Added Code--------------------*/
        const { handle } = this.props.match.params;
            axios.get('http://localhost:5000/EventPages/',{
                params: { eventID: this.props.match.params.id }
                
            }).then(response => {
                var hostId = response.data.data.hostID;
            });
        /*-------------------------------------------------*/
        const userToken = localStorage.getItem('jwtToken');

        //If null, verified, and has same hostID as the user's ID(which maps host to the event)
        /*To be used in the event that the hostID of the specific event to edit is found*/
        //if (userToken !== null && this.state.accountLevel !== null && this.state.userID === hostID) {

        //Assumes that accountLevel not being null makes it verified; may need to change the code
        //if that assumption is wrong
        //if (userToken !== null && hostId === this.state.userID){
        if (userToken !== null){
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

        /* make the server call, which will make the database call to add the new tutor to the tutors list */
        axios.post('http://localhost:5000/updateEvent', { 
            title: title,
            hostID: hostID,
            startDate: startDate,
            startTime: startTime,
            eventId: this.props.match.params.id,
            endDate: endDate,
            endTime: endTime,
            description: description,
            keywords: keywords,
            cohosts: cohosts,
            imageUrl: imageUrl
        }, {
            headers: { Authorization: 'JWT ' + userToken }
        }).then(response => {
            if (response.data.success) {
                this.props.history.push("/calendar");
            }
        }).catch(error => console.log(error));
        /* END OF CONTROLLER CALL */
      }
}


    render(){
        const {title, startDate, startTime, endDate, endTime, description, keywords, cohosts,imageURL} = this.state;

        return(
        <div>
            <div style={{ backgroundColor: '#d6f3ff', height: 1500 }}>
		      <NavBar/>
		  <br />
            <h1 class="center ">Update Event</h1>
            <div class="center update-event-form">
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
                <button style={styles.allButton} onClick={this.handleClick}>Submit</button>
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
      width: 100
    }
  };
  
export default EditEventPage;
