import React, { Component } from 'react';
import './styles/App.css';

class EventPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            planEventButtonColor: "#789ade",
            planEventButtonText: "Add to planned events",
            reminderButtonColor: "#789ade",
            reminderButtonText: "Add reminder",
            hostName: "Alex Wang",
            eventName: "Event name",
            eventDate: "May 7, 2020",
            interestCount: "25",
            eventDescription: "Blah blah blah blah blah blah blah blah blah blah blah blah blah " +
                "blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah " +
                "blah blah blah blah blah blah blah blah blah blah blah blah"
        };
    }


    //Handles the button to add planned event
    handleClickPlanEvent(){
        if(this.state.planEventButtonColor != "#b8b8b8"){
            this.setState({planEventButtonColor: "#b8b8b8"})
            this.setState({planEventButtonText: "Remove from planned events"})
        }
        else{
            this.setState({planEventButtonColor: "#789ade"})
            this.setState({planEventButtonText: "Add to planned events"})
        }

    }

    //Handles the button to add reminder
    handleAddReminder(){
        if(this.state.reminderButtonColor != "#b8b8b8"){
            this.setState({reminderButtonColor: "#b8b8b8"})
            this.setState({reminderButtonText: "Remove reminder"})
        }
        else{
            this.setState({reminderButtonColor: "#789ade"})
            this.setState({reminderButtonText: "Add reminder"})
        }

    }




    render() {

        return (
            <body>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Raleway"/>
                <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"/>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>

                <div class="centerPage" >

                <div class = "w3-row">
                    <div class="center">

                        <div className="w3-card-4 w3-margin w3-white">
                        <h6>
                        <img src="https://media-exp1.licdn.com/dms/image/C561BAQFQ0VKpQYqWrQ/company-background_10000/0?e=2159024400&v=beta&t=8CKJUP2zIu6rhdntDcjvJsB8qI5Eug22v_uHZ8gdlA8"
                             class="centerImage"/>
                        </h6>
                                <div className="w3-container">
                                    <h3><b>{this.state.eventName}</b></h3>
                                    <h5>{this.state.hostName}, <span className="w3-opacity">{this.state.eventDate}</span></h5>
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
                                                <button className={"button button1"}
                                                        onClick={() => this.handleAddReminder()}
                                                        style={{backgroundColor: this.state.reminderButtonColor}}>
                                                    {this.state.reminderButtonText}
                                                </button>


                                            </p>
                                            <a href="#" className="fa fa-facebook"></a>
                                            <a href="#" className="fa fa-twitter"></a>
                                            <a href="#" className="fa fa-instagram"></a>
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
        );
    }

}

EventPage.defaultProps = {color: "blue"}
EventPage.defaultProps = {text: 'Button 1'}
export default EventPage;