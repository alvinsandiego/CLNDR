import React, { Component } from 'react';
import { Button } from 'reactstrap';
import './styles/App.css';

class HostPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            viewForm: false,
            followButtonColor: "#789ade",
            followButtonText: "Follow"
        };
    }




    //Handles the button to follow
    handleFollow(){
        if(this.state.followButtonColor != "#b8b8b8"){
            this.setState({followButtonColor: "#b8b8b8"})
            this.setState({followButtonText: "Unfollow"})
        }
        else{
            this.setState({followButtonColor: "#789ade"})
            this.setState({followButtonText: "Follow"})
        }

    }





    render() {
        return (
            <div>

            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <h1>Host Page</h1>
            </div>
            <div style={{display: 'inline', justifyContent: 'center', alignItems: 'center'}}>
            <h3>Host Name</h3>
            <h5>Host Details: This will be filled with details about the host.</h5>
            </div>
            <div value="withConfirm"style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <button className={"button button1"}
                        onClick={() => this.handleFollow()}
                        style={{backgroundColor: this.state.followButtonColor}}>
                    {this.state.followButtonText}
                </button>
            </div>
            <br />
            </div>

    );

    }
}

export default HostPage;
