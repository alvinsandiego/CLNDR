import React, { Component } from 'react';
import './styles/App.css'
import logo from './img/Logo-Semitransparent.png';
import Account from "./Account";
import axios from "axios";
import NavBar from "./NavBar"

class Following extends Component {

    constructor(props){
        super(props)
        const userID = this.props.userID;

        this.state = {
            userID: "user1",
            hostIDs: [],
            hostArray: []
        }
    }

    componentDidMount = () => {
        let userToken = localStorage.getItem('jwtToken');
        if (userToken !== null) {
            axios.get("http://localhost:5000/following",
            {
                headers: { Authorization: 'JWT ' + userToken },
            }).then(response => {
                if (response.data.success){
                    this.setState({
                        hostArray: response.data.data
                    })
                }
            });
        }
    };


    // componentDidMount() {
    //     this.setData();
    // }

    // setData() {

    //     let newHosts = this.state.hostArray.slice();
    //     for (var i = 0; i < this.state.hostIDs.size(); i++) {

    //         var hostInfo = axios.get("http://localhost:5000/userInfo?userID=" + this.state.hostIDs[i])


    //         newHosts.push({
    //             id: i,
    //             hostName: hostInfo.username,
    //             hostEmail: hostInfo.email
    //         })


    //     }
    //     this.setState({hostArray: newHosts});
    // }

    renderTableData() {
        return (
            <tbody>
                {this.state.hostArray.map((host, index) => {
                    const {id, org_name, username, contact_email} = host;
                    return (
                        <tr class="hosts" key={id}>
                            <td>{id}</td>
                            <td>{org_name}</td>
                            <td>{username}</td>
                            <td>{contact_email}</td>
                        </tr>
                    );
                })}
            </tbody>
        )
    }


    render() {
        return (

            <div>

                <div style={{ backgroundColor: '#d6f3ff', height: 1500 }}>

                    <NavBar/>


                    <br />
                    <div className="events">
                        <div className="events2">

                            <body>

                            <h2>Followed Hosts</h2>

                            <div style={styles.centerDiv}>
                                <table class="host">
                                    <th>No.</th>
                                    <th>Host Name</th>
                                    <th>Username</th>
                                    <th>Email</th>
                                    {this.renderTableData()}
                                </table>
                            </div>

                            </body>
                        </div>
                    </div>
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
