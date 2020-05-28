import React, { Component } from 'react';
import { Button } from 'reactstrap';
class HostPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            viewForm: false
        };
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
            <Button style={{height: 50, width: 150}}> Follow</Button>{' '}
            <Button style={{height: 50, width: 150}}> Unfollow</Button>{' '}
            </div>
            <br />
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Button value="NoConfirm" style={{height: 50, width: 150}}>Mute</Button>{' '}
            <Button value="NoConfirm" style={{height: 50, width: 150}}>Unmute</Button>{' '}
             </div>
            <br />
            </div>

    );

    }
}

export default HostPage;
