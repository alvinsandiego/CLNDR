import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import CalendarView from './CalendarView';

class App extends Component {
  state = {
    data: null
  };

  componentDidMount() {
    // call fetch
    this.callBackendAPI().then(res => this.setState({ data: res.express })).catch(err => console.log(err));
  }

  callBackendAPI = async() => {
    const response = await fetch('/test');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }

    return body;
  };

  render() {
    return (
      <div className="App">
        <header className="App-title">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>

        <p className="App-intro">{this.state.data}</p>
        <CalendarView referenceDate={new Date()} />
      </div>
    );
  }
}

export default App;
