import React, { Component } from 'react';
import CreateEventButton from './CreateEventButton';
import "./styles/CalendarView.css";

const maxEvents = 1;
const linkEvents = true;
const moreEventsLink = true;

var emptyArrayOfArrays = [];
for (var i = 0; i < 31; i++) {
    emptyArrayOfArrays.push([]);
}

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

        var eventsDict = {};

        eventsDict[CalendarView.getMonthIdentifier(this.props.initialReferenceDate)] = testArray;

        this.state = {
            eventsDict: eventsDict,
            referenceDate: this.props.initialReferenceDate
        };
    }

    componentDidMount() {
        // TODO: get the events for the month and map them into events array
        this.callBackendAPI(this.state.referenceDate).catch(err => console.log(err));
    }
    
    callBackendAPI = async(date) => {
        // const response = await fetch('/getEvents?month=' + date.getMonth() + '&year=' + date.getYear());
        // const body = await response.json();

        // if (response.status !== 200) {
        //     throw Error(body.message);
        // }

        // return body;
    };

    incrementMonth() {
        var copyOfRef = new Date(this.state.referenceDate);
        copyOfRef.setMonth(copyOfRef.getMonth() + 1);
        this.setState({
            referenceDate: copyOfRef
        });
    }

    decrementMonth() {
        var copyOfRef = new Date(this.state.referenceDate);
        copyOfRef.setMonth(copyOfRef.getMonth() - 1);
        this.setState({
            referenceDate: copyOfRef
        });
    }

    static getMonthIdentifier(date) {
        return date.toLocaleString('default', { month: 'long', year: 'numeric' });
    }

    render() {
        // get the beginning and end of the month and weekdays so we can properly align and bound the calendar cells
        const begOfMonth = new Date(this.state.referenceDate.getFullYear(), this.state.referenceDate.getMonth(), 1);
        const endOfMonth = new Date(this.state.referenceDate.getFullYear(), this.state.referenceDate.getMonth() + 1, 0);
        const weekdayOfStart = begOfMonth.getDay();
        const weekdayAfterEnd = endOfMonth.getDay() + 1;
        
        // generate a header
        const header = CalendarView.getMonthIdentifier(this.state.referenceDate);

        // grab the list of events from the current month
        var events = this.state.eventsDict[header];

        if (events === undefined) {
            events = emptyArrayOfArrays;
            console.log("Empty array of events: ");
            console.log(JSON.stringify(emptyArrayOfArrays));
        }
        console.log("guhjhsgdhnugdsf");
        console.log(JSON.stringify(this.state.eventsDict));

        console.log("fifdas");
        console.log(JSON.stringify(events));

        // Here, we have a row for the weekday headings. Then, we know each month will occupy at least 4 weeks, so do those unconditionally. Then, for the last 2 weeks a month could potentially occupy, only render them conditionally.
        return (
            <div class="calendar">
                <div class="calendar_heading">
                    <span class="arrow_buttons">
                        <a class="arrow_button" href="#" onClick={this.decrementMonth.bind(this)}>{"<"}</a>
                        <a class="arrow_button" href="#" onClick={this.incrementMonth.bind(this)}>{">"}</a>
                    </span>
                    <span class="calendar_heading_text">{header}</span>
                    <CreateEventButton />
                </div>
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
                    <CalendarRow rowStart={weekdayOfStart} rowEnd={7} arrayStart={0} day={1} events={events} maxEvents={maxEvents} linkEvents={linkEvents} moreEventsLink={moreEventsLink} referenceDate={this.state.referenceDate}/>
                    <CalendarRow rowStart={0} rowEnd={7} arrayStart={7 - weekdayOfStart} day={7 - weekdayOfStart + 1} events={events} maxEvents={maxEvents} linkEvents={linkEvents} moreEventsLink={moreEventsLink} referenceDate={this.state.referenceDate}/>
                    <CalendarRow rowStart={0} rowEnd={7} arrayStart={14 - weekdayOfStart} day={14 - weekdayOfStart + 1} events={events} maxEvents={maxEvents} linkEvents={linkEvents} moreEventsLink={moreEventsLink} referenceDate={this.state.referenceDate}/>
                    <CalendarRow rowStart={0} rowEnd={7} arrayStart={21 - weekdayOfStart} day={21 - weekdayOfStart + 1} events={events} maxEvents={maxEvents} linkEvents={linkEvents} moreEventsLink={moreEventsLink} referenceDate={this.state.referenceDate}/>
                    {(28 - weekdayOfStart + 1) <= endOfMonth.getDate() &&
                        <CalendarRow rowStart={0} rowEnd={((35 - weekdayOfStart + 1) <= endOfMonth.getDate()) ? 7 : weekdayAfterEnd} arrayStart={28 - weekdayOfStart} day={28 - weekdayOfStart + 1} events={events} maxEvents={maxEvents} linkEvents={linkEvents} moreEventsLink={moreEventsLink} referenceDate={this.state.referenceDate}/>
                    }
                    {(35 - weekdayOfStart + 1) <= endOfMonth.getDate() &&
                        <CalendarRow rowStart={0} rowEnd={weekdayAfterEnd} arrayStart={35 - weekdayOfStart} day={35 - weekdayOfStart + 1} events={events} maxEvents={maxEvents} linkEvents={linkEvents} moreEventsLink={moreEventsLink} referenceDate={this.state.referenceDate}/>
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
 * "key" is the array of events for the whole month
 * "maxEvents" is the max number of events to display per day, -1 for no limit
 * "linkEvents" whether to make each event a link or just plain text
 * "moreEventsLink" if we have a max number of events, controls whether or not we want to show a "more events" link
 * "referenceDate" used only to generate the more events link, can pass null if you have this disabled
 */
class CalendarRow extends Component {
    constructor(props) {
        super(props);
    }

    calculateDate(index) {
        return index + this.props.day - this.props.rowStart;
    }

    render() {
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

        // now, render
        return (
            <tr class="calendar_row">
                {
                    // form the cells by mapping the events array (from state, not props, so it is the one with 7 elements)
                    eventsArray.map((item, index) => {
                        if (index < this.props.rowStart || index >= this.props.rowEnd) {
                            // empty cell if we are before rowStart or at or after rowEnd
                            return <td></td>;
                        }
                        else {
                            // otherwise, we put the current day, and map all events taking place that day to divs
                            return <td class="calendar-cell"><div class="date">{this.calculateDate(index)}</div>{
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
                            {this.props.maxEvents !== -1 && item.length > this.props.maxEvents && this.props.moreEventsLink &&
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

CalendarView.defaultProps = {initialReferenceDate: new Date()};
export default CalendarView;
