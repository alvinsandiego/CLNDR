import React, { Component } from 'react';
import '../styles/App.css'

class Following extends Component {

    render() {

        const FollowedHostData = [
            {Hosts: 'Host #1'},
            {Hosts: 'Host #2'},
            {Hosts: 'Host #3'},
            {Hosts: 'Host #4'},
            {Hosts: 'Host #5'}

        ];
        
        return (
            <div>
                <h1>Followed Hosts</h1>
                <ul class="bulletedlist">
                    {FollowedHostData.map((item, index) => {
                        return <li>{item.Hosts}</li>;
                    })}
                </ul>
            </div>
        );
    }
}
export default Following;
