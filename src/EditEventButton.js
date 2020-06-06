import React, { Component } from 'react';
import './styles/App.css';
import Root from './Root';

import axios from "axios";
import apiHost from './config'

class EditEventButton extends Component {
    constructor(props) {
        super(props);
	    this.state= {
		    userId: this.props.userId,
		    hostId: this.props.hostId,
        eventId: this.props.eventId
	    }
    }

	  render() {
      if(this.state.userId === this.state.hostId){
        return(
          <a href={'/editeventinfo/'+this.state.eventId}>
            <button class="control_button">
              Edit Event
            </button>
          </a>
        )
      }
      else { return null }
    }
};

export default EditEventButton
