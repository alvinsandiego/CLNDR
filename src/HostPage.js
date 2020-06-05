import React, { Component } from 'react';
import { Button } from 'reactstrap';
import './styles/App.css';
import axios from "axios";
import Account from "./Account";
import moment from 'moment'
import NavBar from './NavBar';

class HostPage extends Component {
    constructor(props) {
        super(props);


        const hostID = this.props.hostID;
        console.log(this.props.match.params)

        this.state = {
            viewForm: false,
            followButtonColor: "#789ade",
            followButtonText: "Follow",
            hostID: "H1234",
            hostName: "Host1",
            hostEmail:"Host1@gmail.com",
            hostedEventsList: [],
            events: []

        };
    }

    componentDidMount = () => {
        //hostedEventsList: response.data.hostedEventsList,
        let userToken = localStorage.getItem('jwtToken');
            axios.get('http://localhost:5000/userInfo',{
                params: {
                   userID: this.props.match.params.id
                },
            }).then(response => {
                axios.get('http://localhost:5000/eventsForHost',{
                    params: {
                        hostID: this.props.match.params.id
                    }
                }).then(response => {
                    if(response.data.success){
                    this.setState({
                        hostId: this.props.match.params.id,
                        hostedEventsList: response.data.data
                    }) 
                    }
                })
                console.log(response);
                console.log(response.data.data.org_name);
                if(response.data.success){
                    if(response.data.data.org_name != null){
                        this.setState({
                            hostName: response.data.data.org_name,
                            hostEmail: response.data.data.contact_email,
                    })
                }
                else{
                    this.setState({
                        hostName: response.data.data.username,
                        hostEmail: response.data.data.contact_email,
                })
                }
            }
        });

         //to check if user has planned the event before
	    if (userToken === null) {
            console.log("userToken is null");
	    }
	    else {
            axios.get('http://localhost:5000/accountInfo', {
            headers: { Authorization: 'JWT ' + userToken },
        })
        .then(response => {
            console.log("hereeeeee");
            console.log(response.data.data);
            this.checkIfEventIsPlanned(response.data.data.following);
        })
        .catch(error => {
        console.log(error.data);
        });
      }

    }

  //check if this event has already been planned
  checkIfEventIsPlanned(listHost){
    console.log("we got a problem");
    console.log(listHost.includes(this.props.match.params.id))
    if(listHost != null){
    if(listHost.includes(this.props.match.params.id)){
        this.setState({
            followButtonColor: "#b8b8b8",
            followButtonText: "Unfollow",
        })
    }
    else{
        this.setState({
            followButtonColor: "#789ade",
            followButtonText: "Follow",
        })
      }
    }
    else{
    console.log("There was no plannedList")
    }
}

    //Handles the button to follow
    handleFollow(){
        let userToken = localStorage.getItem('jwtToken');
        if(this.state.followButtonColor != "#b8b8b8"){
            this.setState({followButtonColor: "#b8b8b8"})
            this.setState({followButtonText: "Unfollow"})
            if (userToken !== null) {
                axios.post("http://localhost:5000/follow",
                {
                    hostId: this.props.match.params.id,
                },
                {
                    headers: { Authorization: 'JWT ' + userToken },
                }).then(response => {
                    if(response.data.success){
                    }
                })
            }
        }

        else{
            this.setState({followButtonColor: "#789ade"})
            this.setState({followButtonText: "Follow"})
            if (userToken !== null) {
                axios.post("http://localhost:5000/unfollow",
                {
                    hostId: this.props.match.params.id,
                },
                {
                    headers: { Authorization: 'JWT ' + userToken },
                }).then(response => {
                    if(response.data.success){
                    }
                })
            }
        }

    }

    renderTableData(){
        return (
        <tbody>
        {this.state.hostedEventsList.map((event, index) => {
            const {id, eventName, hostName, start, end} = event
            var theStartDate = moment(new Date(start*1000)).format('LLL');
            var theEndDate = moment(new Date(end*1000)).format('LLL');
            return (
                <tr class="events" key={id}>
                    <td><a href={'/eventpage/'+id}>{eventName}</a></td>
                    <td>{theStartDate}</td>
                    <td>{theEndDate}</td>
                </tr>
            )
        })}
        </tbody>
        );
    }


    render() {
        return (
            <div>
            <NavBar/>

            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <h1>{this.state.hostName}</h1>
            </div> <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <h5>Email: {this.state.hostEmail}</h5>
            </div>
            <div value="withConfirm"style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <button className={"button button1"}
                        onClick={() => this.handleFollow()}
                        style={{backgroundColor: this.state.followButtonColor}}>
                    {this.state.followButtonText}
                </button>
            </div>
            <br />

                <body>
                <h2>{this.state.hostName}'s Events</h2>
                <div style={styles.centerDiv}>
                <table class="events" id="events">
                    <th>Event</th>
                    <th>Start Date/Time</th>
                    <th>End Date/Time</th>
                    {this.renderTableData()}
                </table>
                </div>
                </body>

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
Account.defaultProps = {hostID: new String}

export default HostPage;
