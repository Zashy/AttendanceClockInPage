/**
 * Created by Zashy on 1/24/2016.
 */

// require react
var React = require('react');

// require the flux architecture store and action
var AttendanceClockInOutStore = require('./AttendanceClockInOutStore');
var AttendanceClockInOutAction = require('./AttendanceClockInOutAction');

// create the AttendanceClockInOut react component
class AttendanceClockInOut extends React.Component{
	// define the constructor
	constructor(props){
		super(props);
		this.state = this.getClockInOutState();
	}
	// set up change event for when the store is changed
	componentDidMount(){
		AttendanceClockInOutStore.addChangeListener(this._onChange.bind(this));
	}
	// this updates the status or error elements to display what has been changed in the store
	// this is really basic, and full error messages should probably be returned and used here, but the logic is the same
	updateStatusResult(){
		var statusEle = document.getElementsByClassName('status')[0];
		var errorEle = document.getElementsByClassName('error')[0];
		var messages = document.getElementsByClassName('message');
		var inputs = document.getElementsByClassName('entry-input');
		switch(this.state.status){
			case 'success':
				statusEle.style.display = 'inline-block';
				errorEle.style.display = 'none';
				break;
			case 'error':
				statusEle.style.display = 'none';
				errorEle.style.display = 'inline-block';
				break;
		}
		// fancy using Array's forEach function on non-array objects
		Array.prototype.forEach.call(messages, function(element){
			element.style.display = 'inline-block';
		});
		Array.prototype.forEach.call(inputs, function(element){
			element.value = '';
		});
	}
	// gets the current state (mostly loads it from the store)
	getClockInOutState(){
		return {
			status: AttendanceClockInOutStore.getStatus(),
			result: AttendanceClockInOutStore.getResult(),
			user: AttendanceClockInOutStore.getUsername()
		};
	}
	// event for use in the render function onKeyDown, detects enter and submits the data
	onClockInOutKey(event){
		if(event.keyCode == 13){
			this.onClockInOut(event);
		}
	}
	// event to use when clocking in/out
	onClockInOut(event){
		AttendanceClockInOutAction.clockInOut();
	}
	// event to use when checking status
	onCheckStatus(event){
		AttendanceClockInOutAction.checkStatus();
	}
	// event that triggers to update the username to what is in the username field
	onUsername(event){
		var username = event.target.value;
		AttendanceClockInOutAction.updateUsername(username);
	}
	// evet that triggers to update the password to what is in the password field
	onPassword(event){
		var password = event.target.value;
		AttendanceClockInOutAction.updatePassword(password);
	}

	// this is the event that is registered to the store to fire when the store's data has changed
	// this sets the state to the new state from the store
	_onChange(){
		this.setState(this.getClockInOutState(), this.updateStatusResult);
	}

	// render function to render the JSX of this component
	render(){
		return (
			<div className="clock-in-out">
				<div className="data">
					<div className="entry">
					<label className="username" for="username">Username:</label>
					<input className="username entry-input" type="password" name="username" id="username"
					       onKeyDown={this.onClockInOutKey.bind(this)} onChange={this.onUsername} />
					<label className="password" for="password">Password:</label>
					<input className="password entry-input" type="password" name="password" id="password"
					       onKeyDown={this.onClockInOutKey.bind(this)} onChange={this.onPassword} />
					</div>
					<div className="buttons">
						<button onClick={this.onClockInOut}>Clock In/Out</button>
						<button onClick={this.onCheckStatus}>Check Status</button>
					</div>
				</div>
				<div className="information">
					<div className="status">
						<h1 className="heading">Status</h1>
						<span className="message">User {this.state.user} has {this.state.result}.</span>
					</div>
					<div className="error">
						<h1 className="heading">Error</h1>
						<span className="message">User {this.state.user} has encountered an error: {this.state.result}</span>
					</div>
				</div>
			</div>
		);
	}
}

// exports the component
module.exports = AttendanceClockInOut;