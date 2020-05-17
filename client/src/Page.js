import React, { Component } from 'react';
import logo from './logo.svg'
import CalendarView from './CalendarView';

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
			// <CalendarView referenceDate= {new Date()} />
			case 'calendarV': return <CalendarView referenceDate= {new Date()} />;
			case 'planned': return <h1> p </h1>;
			case 'following': return <h1> f </h1>;
			case 'reminders': return <h1> r </h1>;
			case 'muted': return <h1> m </h1>;
			case 'account': return <h1> acc </h1>;
			default: return <h1> cv </h1>;
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
	// render reminders
	setRem() {
		this.setState({
			page: 'reminders'
		})
	}
	// render muted
	setMut() {
		this.setState({
			page: 'muted'
		})
	}
	// render account
	setAcc() {
		this.setState({
			page: 'account'
		})
	}

   render() {
		return (
			<div style={{backgroundColor: '#cccccc'}}>
				<div style= {{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
					<img src={logo} style= {{width: 100, height: 100}}/>
					<input type= "text" style= {{width: 580}}/>
					<button style= {{width: 95}}>search</button>
				</div>
				<div style= {{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
					<button style= {{width: 130}} onClick= {this.setCal.bind(this)}>View Calendar</button>
					<button style= {{width: 130}} onClick= {this.setPla.bind(this)}>Planned Events</button>
					<button style= {{width: 130}}onClick= {this.setFol.bind(this)}>Following</button>
					<button style= {{width: 130}}onClick= {this.setRem.bind(this)}>Reminders</button>
					<button style= {{width: 130}}onClick= {this.setMut.bind(this)}>Muted</button>
					<button style= {{width: 130}}onClick= {this.setAcc.bind(this)}>Account</button>
				</div>
				<br />
				<div style= {{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
					{this.change()}
				</div>
			</div>
   	)
	}
}
export default Page
