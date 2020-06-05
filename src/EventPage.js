import React, { Component } from 'react';
import './styles/App.css';
import axios from "axios";
import NavBar from "./NavBar";
import Planned from "./Planned"
import { Timestamp } from '@google-cloud/firestore';
import moment from 'moment'

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
            userID: "",
            eventHostID: "",

        };
    };
    
    /*Get Account Details*/
    componentDidMount = () =>{
        const { handle } = this.props.match.params;
        console.log(this.props.match.params.id);
        axios.get(`http://localhost:5000/EventPages/`,{
            params: {
                eventID: this.props.match.params.id
            }
        }).then(response => {
            //for host that created the event
            //to check if user has used the 
            let userToken = localStorage.getItem('jwtToken');
            console.log(response.data.hostID)
            axios.get('http://localhost:5000/userInfo',{
                body: {
                   userID: response.data.hostID 
                }
                //need to figure this out tmw ask Kevin
            }).then(response =>{
                console.log(response);
                if(response.data.success){
                    this.setState({
                        hostName: response.data.data.org_name
                    })
                  }
                  else{

                  }
            })
        var theStartDate = new Date(response.data.start._seconds*1000);
        var theEndDate = new Date(response.data.end._seconds*1000);
        console.log(response.data);
        this.setState({
            eventName: response.data.eventName,
            eventStartDate: moment(theStartDate).format('LL'),
            eventStartTime: moment(theStartDate).format('LT'),
            eventEndDate: moment(theEndDate).format('LL'),
            eventEndTime: moment(theEndDate).format('LT'),
            //interestCount: response.data.data.interestCount,
            eventDescription: response.data.eventDescription,
            eventID: this.props.match.params.id,
            //startDate: response.data.start
            })
        }).catch(error => {
            console.log("in componentDidMount");
            console.log(error.data);
        }); 
            console.log(this.state.eventName); 

   
    //to check if user has used the 
    let userToken = localStorage.getItem('jwtToken');
	if (userToken === null) {
	}
	else {
    axios.get('http://localhost:5000/accountInfo', {
      headers: { Authorization: 'JWT ' + userToken },
    })
    .then(response => {
      console.log(response.data);
      console.log(response.data.data.planned_events);
      this.checkIfEventIsPlanned(response.data.data.planned_events)
    })
    .catch(error => {
      console.log(error.data);
    });
    }
  }

  //check if this event has already been planned
  checkIfEventIsPlanned(listEvent){
            console.log(listEvent.includes(this.state.eventID))
            if(listEvent.includes(this.state.eventID)){
                this.setState({
                    planEventButtonColor: "#b8b8b8",
                    planEventButtonText: "Remove from planned events",
                })
            }
            else{
                this.setState({
                    planEventButtonColor: "#b8b8b8",
                    planEventButtonText: "Plan to attend event",
                })
            }
  }

    //Handles the button to add planned event
    handleClickPlanEvent(){
        if(this.state.planEventButtonColor != "#b8b8b8"){
            this.setState({planEventButtonColor: "#b8b8b8"})
            this.setState({planEventButtonText: "Remove from planned events"})
            axios.post("http://localhost:5000/planEvent?userID="+"&eventID="+this.props.eventID);
        }
        else{
            this.setState({planEventButtonColor: "#789ade"})
            this.setState({planEventButtonText: "Add to planned events"})
            axios.post("http://localhost:5000/unplanEvent?userID="+"&eventID="+this.props.eventID);
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
                                <h5>{this.state.hostName}, <span className="w3-opacity">{this.state.eventStartDate}</span></h5>
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
