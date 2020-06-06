import React, { Component } from 'react';
import './styles/App.css';
import axios from "axios";
import apiHost from './config'

/**
 * Props should be:
 * eventID
 */
class PlanEventButton extends Component {
    constructor (props) {
        super(props)

        this.state = {
            awaiting: true,
            renderPlanButton: false,
            eventIsPlanned: false
        }
    }

    componentDidMount = () => {
        const userToken = localStorage.getItem('jwtToken');
        if (userToken !== null) {
            axios.get(apiHost + ':5000/accountInfo', {
                headers: { Authorization: 'JWT ' + userToken } 
            }).then(response => {
                if (response.data.success) {
                    if (response.data.data.planned_events.includes(this.props.eventID)) {
                        this.setState({
                            awaiting: false,
                            renderPlanButton: true,
                            eventIsPlanned: true
                        });
                    }
                    else {
                        this.setState({
                            awaiting: false,
                            renderPlanButton: true,
                            eventIsPlanned: false
                        });
                    }
                }
            })
        }
        else {
            this.setState({
                awaiting: false,
                renderPlanButton: false
            });
        }
    }

    planEvent() {
        const userToken = localStorage.getItem('jwtToken');
        if (userToken !== null) {
            axios.post(apiHost + ':5000/planEvent', {
                eventId: this.props.eventID
            }, {
                headers: { Authorization: 'JWT ' + userToken }
            }).then(response => {
                if (response.data.success) {
                    this.setState({
                        eventIsPlanned: true
                    });
                }
            })
        }
    }

    unplanEvent() {
        const userToken = localStorage.getItem('jwtToken');
        if (userToken !== null) {
            axios.post(apiHost + ':5000/unplanEvent', {
                eventId: this.props.eventID
            }, {
                headers: { Authorization: 'JWT ' + userToken }
            }).then(response => {
                if (response.data.success) {
                    this.setState({
                        eventIsPlanned: false
                    });
                }
            })
        }
    }

    notLoggedIn() {
        alert("Log In to Plan Events");
    }

    render() {
        if (this.state.awaiting) {
            return null;
        }
        else if (this.state.renderPlanButton) {
            if (this.state.eventIsPlanned) {
                // want to give option to unplan
                return (
                    <button className={"button button1"} 
                            onClick={() => this.unplanEvent()}
                            style={{backgroundColor: "#b8b8b8"}}>
                        Remove from Planned Events
                    </button>
                ); 
            }
            else {
                // want to give option to plan
                return (
                    <button className={"button button1"} 
                            onClick={() => this.planEvent()}
                            style={{backgroundColor: "#789ade"}}>
                        Add to Planned Events
                    </button>
                ); 
            }
        }
        else {
            return (
                <button className={"button button1"} 
                        onClick={() => this.notLoggedIn()}
                        style={{backgroundColor: "#b8b8b8"}}>
                    Log In to Plan Events
                </button>
            );
        }
    }
}

export default PlanEventButton;
