import React, { Component } from 'react';
import './styles/App.css';
import axios from "axios";
import NavBar from "./NavBar";
import Planned from "./Planned"
import { Timestamp } from '@google-cloud/firestore';
import moment from 'moment'
import apiHost from './config'
import EditEventButton from './EditEventButton'

class EventPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            planEventButtonColor: "",
            planEventButtonText: "",
            reminderButtonColor: "",
            reminderButtonText: "",
            hostName: "",
            eventName: "",
            eventStartDate: "",
            eventStartTime: "",
            eventEndTime: "",
            eventEndDate: "",
            interestCount: "",
            eventDescription: "",
            eventID: "",
            userID: "6",
            eventHostID: "",

        };
    };
    
    /*Get Account Details*/
    componentDidMount = () =>{
        let userToken = localStorage.getItem('jwtToken');
        const { handle } = this.props.match.params;
        axios.get(apiHost + ':5000/getEvent',{
            params: {
                eventId: this.props.match.params.id
            },
           
        }).then(response => {
            //for host that created the event
            //to check if user has used the 
            axios.get(apiHost + ':5000/userInfo',{
                params: {
                   userID: response.data.data.hostID
                },
            }).then(response =>{
                console.log(response);
                if(response.data.success){
                    if(response.data.data.org_name == null){
                        this.setState({
                            hostName: response.data.data.username
                        })
                    }
                    else{
                        this.setState({
                            hostName: response.data.data.org_name
                        })
                    }
                  }
                  else{
                  }
            })

        var theStartDate = new Date(response.data.data.start._seconds*1000);
        var theEndDate = new Date(response.data.data.end._seconds*1000);
        this.setState({
            eventName: response.data.data.eventName,
            eventStartDate: moment(theStartDate).format('LL'),
            eventStartTime: moment(theStartDate).format('LT'),
            eventEndDate: moment(theEndDate).format('LL'),
            eventEndTime: moment(theEndDate).format('LT'),
            eventDescription: response.data.data.eventDescription,
            eventID: this.props.match.params.id,
            interestCount: response.data.data.interestCount,
            eventHostID: response.data.data.hostID
            })
        }).catch(error => {
            console.log("in componentDidMount");
            console.log(error.data);
        }); 


    //to check if user has planned the event before
	if (userToken === null) {
	}
	else {
    axios.get(apiHost + ':5000/accountInfo', {
      headers: { Authorization: 'JWT ' + userToken },
    })
    .then(response => {
            this.checkIfEventIsPlanned(response.data.data.planned_events);
    })
    .catch(error => {
      console.log(error.data);
    });
    } 
  }

  //check if this event has already been planned
  checkIfEventIsPlanned(listEvent){
            if(listEvent != null){
            console.log(listEvent.includes(this.state.eventID))
            if(listEvent.includes(this.state.eventID)){
                this.setState({
                    planEventButtonColor: "#b8b8b8",
                    planEventButtonText: "Remove from planned events",
                })
            }
            else{
                this.setState({
                    planEventButtonColor: "#789ade",
                    planEventButtonText: "Add to planned events",
                })
            }
        }
        else{
            console.log("There was no plannedList")
        }
  }

    //Handles the button to add planned event
    handleClickPlanEvent(){
        let userToken = localStorage.getItem('jwtToken');
        if(this.state.planEventButtonColor != "#b8b8b8"){
            this.setState({planEventButtonColor: "#b8b8b8"})
            this.setState({planEventButtonText: "Remove from planned events"})
            if (userToken !== null) {
                axios.post(apiHost + ":5000/planEvent",
                {
                    eventId: this.props.match.params.id,
                },
                {
                    headers: { Authorization: 'JWT ' + userToken },
                }).then(response => {
                    if(response.data.success){
                        console.log(this.state.interestCount+1);
                        this.handleInterestCount(this.state.interestCount+1);
                    }
                })
            }
        }

        else{
            this.setState({planEventButtonColor: "#789ade"})
            this.setState({planEventButtonText: "Add to planned events"})
            if (userToken !== null) {
                axios.post(apiHost + ":5000/unplanEvent",
                {
                    eventId: this.props.match.params.id,
                },
                {
                    headers: { Authorization: 'JWT ' + userToken },
                }).then(response => {
                    if(response.data.success){
                        console.log(this.state.interestCount+1);
                        this.handleInterestCount(this.state.interestCount-1);
                    }
                    console.log(response);
                })
            }
        }

    }

    handleInterestCount(value){
        console.log(value);
        let userToken = localStorage.getItem('jwtToken');
        if (userToken !== null) {
        axios.post(apiHost + ':5000/incrementInterest', {
            eventId: this.props.match.params.id,
            interestCount: value
        },{
            headers: { Authorization: 'JWT ' + userToken }
        }).then(response => {
            console.log(response);
        if (response.data.success) {
            this.setState({
                interestCount: value
            })
        }
    }).catch(error => console.log(error));
    }
}

    handleEditEvent(){
      // get event id and host id
      const { handle } = this.props.match.params;
        axios.get(apiHost + ':5000/getEvent',{
            params: {
                eventId: this.props.match.params.id
            },
           
        }).then(response => {
        this.setState({
            eventID: this.props.match.params.id,
            eventHostID: response.data.data.hostID
            })
        }).catch(error => {
            console.log(error.data);
        }); 

// get user id
    let userToken = localStorage.getItem('jwtToken');
	if (userToken === null) {
	}
	else {
    axios.get(apiHost + ':5000/accountInfo', {
      headers: { Authorization: 'JWT ' + userToken },
    })
    .then(response => {
      if(response.data.success){
      this.setState({
			userID: response.data.id,
     });
      }
      else{}
    })
    .catch(error => {
      console.log(error.data);
    });
        if(this.state.userID === this.state.eventHostID){
          this.props.history.push('/editeventpage/'+this.state.eventID)

      }
  }



    }


    render() {

        return (
            <div style={{ backgroundColor: '#d6f3ff', height: 1500 }}>
            <NavBar/>
            <body>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Raleway"/>
            <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"/>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>

            <div class="centerPage" >

                <div class = "w3-row">
                    <div class="center2">

                        <div className="w3-card-4 w3-margin w3-white">
                            <h6>
                                <img src="https://media-exp1.licdn.com/dms/image/C561BAQFQ0VKpQYqWrQ/company-background_10000/0?e=2159024400&v=beta&t=8CKJUP2zIu6rhdntDcjvJsB8qI5Eug22v_uHZ8gdlA8"
                                     class="centerImage"/>
                            </h6>
                            <div className="w3-container">
                                <h3><b>{this.state.eventName}</b></h3>
                                <h5><a href={'/hostpage/'+this.state.eventHostID}>{this.state.hostName}</a>, <span className="w3-opacity">{this.state.eventStartDate}</span></h5>
                                <h5><span className="w3-opacity">{this.state.eventStartTime}-{this.state.eventEndTime}</span></h5>
                            </div>

                            <div className="w3-container">
                                <p>{this.state.eventDescription}</p>
                                <div className="w3-row">
                                    <div className="w3-col m8 s12">
                                        <p>
                                            <button className={"button button1"}
                                                    onClick={() => this.handleClickPlanEvent()}
                                                    style={{backgroundColor: this.state.planEventButtonColor}}>
                                                {this.state.planEventButtonText}
                                            </button>

                                        </p>

                                    </div>
                                    <div className="w3-col m4 w3-hide-small">
                                        <p><span className="w3-padding-large w3-right"><b>Interest Count  </b> <span
                                            className="w3-tag">{this.state.interestCount}</span></span></p>
                                    </div>
                                </div>
                            <a href={"/editeventinfo/"+ this.props.match.params.id}>
                                <button class='control_button'>
                                  Edit Event
                                </button>
                            </a>

                            </div>
                        </div>

                    </div>
                </div>
            </div>


            </body>
            </div>
        );
    }

}

EventPage.defaultProps = {color: "blue"}
EventPage.defaultProps = {text: 'Button 1'}




export default EventPage;
