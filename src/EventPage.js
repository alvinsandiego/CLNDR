import React, { Component } from 'react';
import './styles/App.css';
import axios from "axios";
import NavBar from "./NavBar";
import moment from 'moment'
import apiHost from './config'
import PlanEventButton from './PlanEventButton'

class EventPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            planEventButtonColor: "",
            planEventButtonText: "Log in to plan events",
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
            image:""	

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
            eventHostID: response.data.data.hostID,
            image: response.data.data.imageUrl
            })
        }).catch(error => {
            console.log("in componentDidMount");
            console.log(error.data);
        });
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
                                <img src={this.state.image} class="centerImage"/>
                            </h6>
                            <div className="w3-container">
                                <h2><b>{this.state.eventName}</b></h2>
                                <h4>Hosted By: <a href={'/hostpage/'+this.state.eventHostID}>{this.state.hostName}</a></h4>
                                <br/>
                                <h5><span className="w3-opacity">Start: {this.state.eventStartDate} {this.state.eventStartTime}</span></h5>
                                <h5><span className="w3-opacity">End: {this.state.eventEndDate} {this.state.eventEndTime}</span></h5>
                            </div>

                            <div className="w3-container">
                                <p>Description:</p>
                                <p>{this.state.eventDescription}</p>
                                <div className="w3-row">
                                    <div className="w3-col m8 s12">
                                        <p>
                                        <PlanEventButton eventID={this.props.match.params.id} />

                                        </p>

                                    </div>
                                    <div className="w3-col m4 w3-hide-small">
                                    </div>
                                </div>
                            <a href={"/editeventpage/"+ this.props.match.params.id}>
                                <button style={{marginBottom: '1em'}} class='control_button'>
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
