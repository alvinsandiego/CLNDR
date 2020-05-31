import React, { Component } from 'react';
import { Button } from 'reactstrap';
import './styles/App.css';
import axios from "axios";
import Account from "./Account";

class HostPage extends Component {
    constructor(props) {
        super(props);


        const hostID = this.props.hostID;


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




    //Handles the button to follow
    handleFollow(){
        if(this.state.followButtonColor != "#b8b8b8"){
            this.setState({followButtonColor: "#b8b8b8"})
            this.setState({followButtonText: "Unfollow"})
            axios.post("http://localhost:5000/followHost?userID="+"&hostID="+this.props.hostID);
        }
        else{
            this.setState({followButtonColor: "#789ade"})
            this.setState({followButtonText: "Follow"})
            axios.post("http://localhost:5000/unfollowHost?userID="+"&hostID="+this.props.hostID);
        }

    }


    componentDidMount = () => {
        axios.get("http://localhost:5000/userInfo?hostID=" + this.state.hostID).then(response => {
            this.setState({
                hostName: response.data.username,
                hostEmail: response.data.email,
                hostedEventsList: response.data.hostedEventsList,
            })
        });
    };




    componentDidMount() {
        this.setData();
    }

    setData(){
        let newEvents = this.state.events.slice();
        for(var i=0; i<this.state.hostedEventsList.size(); i++){

            var eventInfo = axios.get("http://localhost:5000/EventInfo?eventID=" + this.state.hostedEventsList[i])


            newEvents.push({id: eventInfo.id,
                eventName: eventInfo.eventName,
                eventDate: eventInfo.eventDate,
                eventTime: eventInfo.eventTime})


        }
        this.setState({events : newEvents});

    }





    renderTableData(){
        return this.state.events.map((event, index) => {
            const {id, eventName, hostName, eventDate, eventTime} = event
            return (
                <tr class="events" key={id}>
                    <td>{id}</td>
                    <td>{eventName}</td>
                    <td>{eventDate}</td>
                    <td>{eventTime}</td>
                </tr>
            )
        })
    }





    render() {



        return (
            <div>

            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <h1>Host Page</h1>
            </div>
            <div style={{display: 'inline', justifyContent: 'center', alignItems: 'center'}}>
            <h3>{this.state.hostName}</h3>
            <h5>Email: {this.state.hostEmail}</h5>
            <h5>Host ID: {this.state.hostId}</h5>
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

                <table className="events" id="events">
                    <th>No.</th>
                    <th>Event</th>
                    <th>Date</th>
                    <th>Time</th>
                    <tbody>
                    {this.renderTableData()}
                    </tbody>
                </table>

                </body>

            </div>





    );

    }
}

Account.defaultProps = {hostID: new String}

export default HostPage;
