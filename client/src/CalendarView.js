import React, { Component } from 'react';
import "./CalendarView.css";

const maxEvents = 1;
const linkEvents = true;
const moreEventsLink = true;

/** A Calendar. Pass the following props:
 * "referenceDate" is usually the current date, this component will use the reference date to determine what month to render and get events for.
 */
class CalendarView extends Component {
    constructor(props) {
        super(props);

        // create some test data
        var testArray = []
        for (var i = 0; i < 31; i++) {
            testArray.push([{name: "Event 1 on day " + i, id: (i * 2)}, {name: "Test2!", id: ((i * 2) + 1)}]);
        }
        this.state = {
            events: testArray
        };
    }

    componentDidMount() {
        // TODO: get the events for the month and map them into events array
        this.callBackendAPI(this.state.currentDate).catch(err => console.log(err));
    }
    
    callBackendAPI = async(date) => {
        // const response = await fetch('/getEvents?month=' + date.getMonth() + '&year=' + date.getYear());
        // const body = await response.json();

        // if (response.status !== 200) {
        //     throw Error(body.message);
        // }

        // return body;
    };

    render() {
        // get the beginning and end of the month and weekdays so we can properly align and bound the calendar cells
        const begOfMonth = new Date(this.props.referenceDate.getFullYear(), this.props.referenceDate.getMonth(), 1);
        const endOfMonth = new Date(this.props.referenceDate.getFullYear(), this.props.referenceDate.getMonth() + 1, 0);
        const weekdayOfStart = begOfMonth.getDay();
        const weekdayAfterEnd = endOfMonth.getDay() + 1;
        
        // generate a header
        const header = this.props.referenceDate.toLocaleString('default', { month: 'long', year: 'numeric' });

        // Here, we have a row for the weekday headings. Then, we know each month will occupy at least 4 weeks, so do those unconditionally. Then, for the last 2 weeks a month could potentially occupy, only render them conditionally.
        return (
            <div class="calendar">
                <div class="calendar_heading"><span class="calendar_heading_text">{header}</span><CreateEventButton /></div>
                <table>
                    <tr class="weekdays">
                        <td>Sunday</td>
                        <td>Monday</td>
                        <td>Tuesday</td>
                        <td>Wednesday</td>
                        <td>Thursday</td>
                        <td>Friday</td>
                        <td>Saturday</td>
                    </tr>
                    <CalendarRow rowStart={weekdayOfStart} rowEnd={7} arrayStart={0} day={1} events={this.state.events} maxEvents={maxEvents} linkEvents={linkEvents} moreEventsLink={moreEventsLink} referenceDate={this.props.referenceDate}/>
                    <CalendarRow rowStart={0} rowEnd={7} arrayStart={7 - weekdayOfStart} day={7 - weekdayOfStart + 1} events={this.state.events} maxEvents={maxEvents} linkEvents={linkEvents} moreEventsLink={moreEventsLink} referenceDate={this.props.referenceDate}/>
                    <CalendarRow rowStart={0} rowEnd={7} arrayStart={14 - weekdayOfStart} day={14 - weekdayOfStart + 1} events={this.state.events} maxEvents={maxEvents} linkEvents={linkEvents} moreEventsLink={moreEventsLink} referenceDate={this.props.referenceDate}/>
                    <CalendarRow rowStart={0} rowEnd={7} arrayStart={21 - weekdayOfStart} day={21 - weekdayOfStart + 1} events={this.state.events} maxEvents={maxEvents} linkEvents={linkEvents} moreEventsLink={moreEventsLink} referenceDate={this.props.referenceDate}/>
                    {(28 - weekdayOfStart + 1) <= endOfMonth.getDate() &&
                        <CalendarRow rowStart={0} rowEnd={((35 - weekdayOfStart + 1) <= endOfMonth.getDate()) ? 7 : weekdayAfterEnd} arrayStart={28 - weekdayOfStart} day={28 - weekdayOfStart + 1} events={this.state.events} maxEvents={maxEvents} linkEvents={linkEvents} moreEventsLink={moreEventsLink} referenceDate={this.props.referenceDate}/>
                    }
                    {(35 - weekdayOfStart + 1) <= endOfMonth.getDate() &&
                        <CalendarRow rowStart={0} rowEnd={weekdayAfterEnd} arrayStart={35 - weekdayOfStart} day={35 - weekdayOfStart + 1} events={this.state.events} maxEvents={maxEvents} linkEvents={linkEvents} moreEventsLink={moreEventsLink} referenceDate={this.props.referenceDate}/>
                    }
                    
                </table>
            </div>
        );
    }
}

/** A row of 7 cells. Pass the following props (all except "day" are 0 based):
 * "rowStart" to specify at what cell the numbering starts
 * "rowEnd" to specify at what cell the numbering ends
 * "arrayStart" to specify the index into the events array where we should start pulling events
 * "day" to specify what day of the month we start numbering this row from (1 based)
 * "events" is the array of events for the whole month
 * "maxEvents" is the max number of events to display per day, -1 for no limit
 * "linkEvents" whether to make each event a link or just plain text
 * "moreEventsLink" if we have a max number of events, controls whether or not we want to show a "more events" link
 * "referenceDate" used only to generate the more events link, can pass null if you have this disabled
 */
class CalendarRow extends Component {
    constructor(props) {
        super(props);

        // pick the events that we will use in this row
        var eventsArray = []
        for (var i = 0; i < 7; i++) {
            // we copy the events from the events prop iff rowStart <= i < rowEnd, otherwise push an empty array
            if (i >= this.props.rowStart && i < this.props.rowEnd) {
                eventsArray.push(this.props.events[this.props.arrayStart + (i - this.props.rowStart)]);
            }
            else {
                eventsArray.push([]);
            }
        }

        // set the state to the array we just made
        this.state = {
            events: eventsArray
        };
    }

    calculateDate(index) {
        return index + this.props.day - this.props.rowStart;
    }

    render() {
        return (
            <tr class="calendar_row">
                {
                    // form the cells by mapping the events array (from state, not props, so it is the one with 7 elements)
                    this.state.events.map((item, index) => {
                        if (index < this.props.rowStart || index >= this.props.rowEnd) {
                            // empty cell if we are before rowStart or at or after rowEnd
                            return <td></td>;
                        }
                        else {
                            // otherwise, we put the current day, and map all events taking place that day to divs
                            return <td><div class="date">{this.calculateDate(index)}</div>{
                                item.map((event, index) => {
                                    if (this.props.maxEvents === -1 || index < this.props.maxEvents) {
                                        if (this.props.linkEvents) {
                                            return (<div class="event"><a href={"/viewEvent?id=" + event.id}>{event.name}</a></div>)
                                        }
                                        else {
                                            return (<div class="event">{event.name}</div>)
                                        }
                                    }
                                    else {
                                        return null;
                                    }
                                })
                            }
                            {this.props.maxEvents !== -1 && item.length > this.props.maxEvents &&
                                <a class="bold" href={"/viewEvents?year=" + this.props.referenceDate.toLocaleString('default', { year: 'numeric'}) + "&month=" + this.props.referenceDate.toLocaleString('default', { month: 'numeric'}) + "&day=" + this.calculateDate(index)}>View All></a>
                            }
                            </td>;
                        }
                    })
                }
            </tr>
        );
    }
}

class CreateEventButton extends Component {
    constructor(props) {
        super(props)

        this.state = {
            doRender: true
        };
    }

    componentDidMount() {
        // call fetch
        this.callBackendAPI().then(res => this.setState({ doRender: true /* res.isHost */ })).catch(err => console.log(err));
    }
    
    // TODO: we will have it send a request to the API, to check if we are host
    // if we are, then we will actually render something, otherwise no
    // TODO: Consider security vulnerability, it might be possible for someone to force the button to
    // render, we will need additional backend checks on event creation page to ensure non-hosts can't
    // actually create events
    callBackendAPI = async() => {
        const response = await fetch('/currentUserStatus');
        const body = await response.json();

        if (response.status !== 200) {
            throw Error(body.message);
        }

        return body;
    };

    render() {
        if (this.state.doRender) {
            return (
                <a class="create_event_button" href="createEvent">+ Create an Event</a>
            );
        }
        else {
            return null;
        }
    }
}

export default CalendarView;