/**
 * Created by Zashy on 1/22/2016.
 */

// require react
var React = require('react');

// require the flux architecture components (store and action)
var AttendanceClockStore = require('./AttendanceClockStore');
var AttendanceClockAction = require('./AttendanceClockAction');

// require additional react components
var Clock = require('./Clock');

// constant arrays for the names to use for the months and days displayed
// alternatively external libraries such as Date.js could handle the date formatting
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// create the AttendanceClock react component
class AttendanceClock extends React.Component {
	// define the constructor
	constructor(props){
		// call the parent's constructor
		super(props);
		this.state=this.getClockState();
	}
	// get the current state
	getClockState(){
		// this retrieves the date from the store
		var currentDate = AttendanceClockStore.getDate();
		return {
			date: currentDate,
			localDate: currentDate,
			dateString: this.getDString(currentDate),
			timeString: this.getTString(currentDate)
		};
	}
	// formats the date string for display on the page
	getDString(date){
		if(!date.getDate)
			console.log(date);
		var day = date.getDate(),
			weekday = date.getDay(),
			month = date.getMonth(),
			year = date.getFullYear();
		return days[weekday] + ' ' + months[month] + ' ' + day + ', ' + year;
	}
	// formats the time string for display on the page
	getTString(date){
		var	hour = date.getHours(),
			minute = date.getMinutes(),
			second = date.getSeconds();
		return  (hour.toString().length == 1?'0'+hour:hour) + ':' +
				(minute.toString().length==1?'0'+minute:minute) + ':' +
				(second.toString().length==1?'0'+second:second);
	}
	// set up change event for when the store is changed
	// also sets up the timing intervals to update the clock and refresh the store
	componentDidMount() {
		AttendanceClockStore.addChangeListener(this._onChange.bind(this));
		this.refreshServerInterval = setInterval(this.onRefreshServer, 5*60*1000);
		this.refreshInterval = setInterval(this.incrementDate.bind(this), 1000);
		this.hideClockArea();
	}
	// remove events and intervals when component is unmounted
	componentWillUnmount(){
		AttendanceClockStore.removeChangeListener(this._onChange.bind(this));
		clearInterval(this.refreshServerInterval);
		clearInterval(this.refreshInterval);
	}
	// locally increments the date by setting the state to date+1 second
	incrementDate(){
		this.setState(function(previousState, currentProps){
			previousState.localDate.setSeconds(previousState.localDate.getSeconds()+1);

			return {
				date: previousState.date,
				localDate: previousState.localDate,
				dateString: this.getDString(previousState.localDate),
				timeString: this.getTString(previousState.localDate)
			};
		});
		this.showClockArea();
	}
	// requests the store to refresh the date through an action
	onRefreshServer(){
		AttendanceClockAction.refreshServer();
	}
	// the following show or hide the clock to prevent the clock from showing incorrect data on first page load
	showClockArea(){
		document.getElementsByClassName('attendance-clock')[0].style.visibility = 'visible';
	}
	hideClockArea(){
		document.getElementsByClassName('attendance-clock')[0].style.visibility = 'hidden';
	}

	// render function to render the jsx of the page
	render(){
		// return the canvas with the height and width set from the props
		return (
				<div className="attendance-clock" style={this.state.acStyle}>
					<div className="clock-text date">{this.state.dateString}</div>
					<div className="clock-text time">{this.state.timeString}</div>
					<Clock width={this.props.width} height={this.props.height} date={this.state.localDate} />
					<input id="attendanceClockDateTime" type="hidden" value={this.state.localDate} />
				</div>

		);
	}

	// this is the event that is registered to the store to fire when the store's data has changed
	// this sets the state to the new state from the store
	_onChange() {
		this.setState(this.getClockState());
	}
}

// exports the component
module.exports = AttendanceClock;