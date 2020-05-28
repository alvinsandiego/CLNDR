import React, { Component } from 'react';
import './styles/App.css';


class Following extends Component {

    constructor(props){
        super(props)
        this.state={
            events: [
                {id: 1, hostName: 'Host 1', hostEmail: 'Host1@gmail.com'},
                {id: 2, hostName: 'Host 2', hostEmail: 'Host2@gmail.com'},
                {id: 3, hostName: 'Host 3', hostEmail: 'Host3@gmail.com'},
                {id: 4, hostName: 'Host 4', hostEmail: 'Host4@gmail.com'},

            ]
        }
    }



    renderTableData(){
        return this.state.events.map((host, index) => {
            const {id, hostName, hostEmail} = host
            return (
                <tr class="events" key={id}>
                    <td>{id}</td>
                    <td>{hostName}</td>
                    <td>{hostEmail}</td>
                </tr>
            )
        })
    }







    render() {

        return (
            <body>
            <h2>Followed Hosts</h2>

            <table class="host">
                <th>No.</th>
                <th>Host</th>
                <th>Email</th>
                <tbody>
                {this.renderTableData()}
                </tbody>
            </table>

            </body>
        );
    }
}


export default Following
