import React, { Component } from 'react';
import logo from './img/Logo-Semitransparent.png';
import CalendarView from './CalendarView';
import Account from './Account';
import CreateEventPage from './CreateEventPage';
import Following from './Following';
import Planned from './Planned';
import EventPage from './EventPage';
import HostPage from './HostPage';
import Planned2 from './Planned'
import CreateAccount from './CreateAccount'


import './styles/App.css';
import EditAccountInfo from "./EditAccountInfo";
// This file contains the main page of the app that allows the user
// to navigate to all the other pages

class Page extends Component {
    constructor(props) {
      super(props);
    this.state = {
      page: 'calendarV'
    };
    }
  
  // switch case statement that determines which 
  // component to render depending on the state
  change() { 
    switch(this.state.page) {
      case 'calendarV': return <CalendarView initialReferenceDate={new Date()} />;
      case 'planned': return <EventPage/>;
      case 'following': return <Following/>;
      case 'account': return <Account />;
      case 'create': return <CreateEventPage />;
      default: return <CalendarView initialReferenceDate= {new Date()} />;
    }
  }
  // render calendar view
  setCal() {
    this.setState({
      page: 'calendarV'
    })
  }
  // render planned events
  setPla() {
    this.setState({
      page: 'planned'
    })
  }
  // render following
  setFol() {
    this.setState({
      page: 'following'
    })
  }
  // render account
  setAcc() {
    this.setState({
      page: 'account'
    })
  }
  // render create event page
  cEvent() {
    this.setState({
      page: 'create'
    })
  }





   render() {

      const imageClick = () =>{
        return <CalendarView initialReferenceDate= {new Date()} />;
      }

    return (
        <div style={{backgroundColor: '#d6f3ff', height: 1500}}>
          <div style= {{display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white'}}>
            <img src={logo} style= {{width: 100, height: 100} }/>
            <h1 style={{width: 500}}>CLN<span className="goldText">DR</span></h1>
            <input type= "text" style= {{width: 180}}/>
            <button style= {{width: 95}}>Search</button>
          </div>

          <div style={{backgroundColor: "#004d6e", textAlign: "center"}}>
            <button class = "control_button" onClick= {this.setCal.bind(this)}>
              View Calendar
            </button>
            <button class = "control_button" onClick= {this.setPla.bind(this)}>
              Planned Events
            </button>
            <button class = "control_button" onClick= {this.setFol.bind(this)}>
              Following
            </button>
            <button class = "control_button" onClick= {this.setAcc.bind(this)}>
              Account
            </button>
            <button class = "control_button" onClick= {this.cEvent.bind(this)}>
              Create Event
            </button>
          </div>

          <br />

          <div style= {styles.centerDiv}>
            {this.change()}
          </div>
        </div>
    )
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

export default Page
