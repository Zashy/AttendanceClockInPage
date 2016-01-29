/**
 * Created by Zashy on 1/22/2016.
 */

// include react
var React = require('react');
var AttendanceClockStore = require('./AttendanceClockStore');
var AttendanceClockAction = require('./AttendanceClockAction');
var Clock = require('./Clock');


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
		var currentDate = AttendanceClockStore.getDate();
		return {
			date: currentDate,
			localDate: currentDate,
			dateString: this.getDString(currentDate),
			timeString: this.getTString(currentDate)
		};
	}
	getDString(date){
		if(!date.getDate)
			console.log(date);
		var day = date.getDate(),
			weekday = date.getDay(),
			month = date.getMonth(),
			year = date.getFullYear();
		return days[weekday] + ' ' + months[month] + ' ' + day + ', ' + year;
	}
	getTString(date){
		var	hour = date.getHours(),
			minute = date.getMinutes(),
			second = date.getSeconds();
		return  (hour.toString().length == 1?'0'+hour:hour) + ':' +
				(minute.toString().length==1?'0'+minute:minute) + ':' +
				(second.toString().length==1?'0'+second:second);
	}
	// set event for when component is mounted
	componentDidMount() {
		AttendanceClockStore.addChangeListener(this._onChange.bind(this));
		this.refreshServerInterval = setInterval(this.onRefreshServer, 5*60*1000);
		this.refreshInterval = setInterval(this.incrementDate.bind(this), 1000);
	}
	// remove event when component is unmounted
	componentWillUnmount(){
		AttendanceClockStore.removeChangeListener(this._onChange.bind(this));
		clearInterval(this.refreshServerInterval);
		clearInterval(this.refreshInterval);
	}
	componentDidUpdate(){
		new Clock().showClock();
	}
	// refresh tasks
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
	}
	onRefreshServer(){
		AttendanceClockAction.refreshServer();
	}
	// render function to render the jsx of the page
	render(){
		// return the canvas with the height and width set from the props
		return (
			<div>
				<div className="attendance-clock">
					<div className="clock-text date">{this.state.dateString}</div>
					<div className="clock-text time">{this.state.timeString}</div>
					<Clock width={this.props.width} height={this.props.height} date={this.state.localDate} />
					<input id="attendanceClockDateTime" type="hidden" value={this.state.localDate} />
				</div>
				<div>
					<button onClick={this.onRefreshServer}>Refresh</button>
				</div>
			</div>

		);
	}

	_onChange() {
		this.setState(this.getClockState());
	}
}

// exports the component
module.exports = AttendanceClock;