import React, { Component } from 'react';
import './styles/App.css'
import logo from './img/Logo-Semitransparent.png';

class Following extends Component {

    constructor(props){
        super(props)
        this.state={
            events: []
        }
    }



    componentDidMount() {
        this.setData();
    }

    setData() {
        /**
         * Code for Complete Implementation :
         * let newEvents = this.state.events.slice();
         * let ids = getId();       // store ids in array
         * 
         * for (i = 0; i < ids.length; i += 1) {
         *  let host = getFollowedHost(ids[i]);
         *  newEvents.push({
         * id: plEvent.id,
         * hostName: plEvent.hostName,
         * hostEmail: plEvent.hostEmail}) 
         * }
         */

         // Place Holders
        let ids = [0, 1, 2, 3, 4, 5]
        let hostNames = ['Donald J. Trump', 'Vladimir Putin', 'Emmanuel Macron', 'Kim Jong Un', 'Boris Johnson', 'Xi Jinping']
        let hostEmails = ['dTrump@usaNumber1.us', 'vPutin@motherRussia.ru', 'kUn@DPRK.com', 'bJohnson@brit.br', 'xJinping@china.cn', 'host6@ucsd.edu']
        
        // Implementation
        let newEvents = this.state.events.slice();
        for (let i = 0; i < 6; i += 1) {
            newEvents.push({id: ids[i], 
                hostName: hostNames[i],
        hostEmail: hostEmails[i]})
        }

        this.setState({events : newEvents});
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
            <div>
                <div style={{ backgroundColor: '#d6f3ff', height: 1500 }}>
                    <div style= {{display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: 'white'}}>
                      <img src={logo} style= {{width: 100, height: 100} }/>
                      <h1 style={{width: 500}}>CLN<span className="goldText">DR</span></h1>
                      <input type= "text" style= {{width: 180}}/>
                      <button style= {{width: 95}}>Search</button>
                    </div>

                    <div style={styles.centerDiv}>
                        <a href="/calendar">
                            <button class = "control_button" style={styles.allButton}>
                                View Calendar
                            </button>
                        </a>
                        <a href="/planned">
                            <button class = "control_button" style={styles.allButton}>
                                Planned Events
                            </button>
                        </a>
                        <a href="/following">
                            <button class = "control_button" style={styles.allButton}>
                                Following
                            </button>
                        </a>
                        <a href="/account">
                            <button class = "control_button" style={styles.allButton}>
                                Account
                            </button>
                        </a>
                        <a href="/createevent">
                            <button class = "control_button" style={styles.allButton}>
                                Create Event
                            </button>
                        </a>
                    </div>
                    <br />
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
                </div>
            </div>
        );
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
export default Following;
