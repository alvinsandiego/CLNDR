import React, { Component } from 'react';
import './styles/Hosts.css'

class Muted extends Component {

    render() {

        const MutedHostData = [
            {Hosts: 'Host #1'},
            {Hosts: 'Host #2'},
            {Hosts: 'Host #3'},
            {Hosts: 'Host #4'},
            {Hosts: 'Host #5'}

        ];
        
        return (
            <div>
                <h1>Muted Hosts</h1>
                <ul class="bulletedlist">
                    {MutedHostData.map((item, index) => {
                        return <li>{item.Hosts}</li>;
                    })}
                </ul>
            </div>
        );
    }
}
export default Muted;