/**
 * Created by Zashy on 1/24/2016.
 */

// include react
var React = require('react');
var AttendanceClockInOutStore = require('./AttendanceClockInOutStore');
var AttendanceClockInOutAction = require('./AttendanceClockInOutAction');

class AttendanceClockInOut extends React.Component{
	constructor(props){
		super(props);
		this.state = this.getClockInOutState();
	}
	componentDidMount(){
		AttendanceClockInOutStore.addChangeListener(this._onChange.bind(this));
	}
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
		Array.prototype.forEach.call(messages, function(element){
			element.style.display = 'inline-block';
		});
		console.log('p');
		Array.prototype.forEach.call(inputs, function(element){
			element.value = '';
		});
	}

	getClockInOutState(){
		return {
			status: AttendanceClockInOutStore.getStatus(),
			result: AttendanceClockInOutStore.getResult(),
			user: AttendanceClockInOutStore.getUsername()
		};
	}
	onClockInOutKey(event){
		if(event.keyCode == 13){
			onClockInOut(event);
		}
	}
	onClockInOut(event){
		document.getElementsByClassName('entry-input');
		AttendanceClockInOutAction.clockInOut();
	}
	onCheckStatus(event){
		AttendanceClockInOutAction.checkStatus();
	}
	onUsername(event){
		var username = event.target.value;
		AttendanceClockInOutAction.updateUsername(username);
	}
	onPassword(event){
		var password = event.target.value;
		AttendanceClockInOutAction.updatePassword(password);
	}

	_onChange(){
		this.setState(this.getClockInOutState(), this.updateStatusResult);
	}

	render(){
		return (
			<div className="clock-in-out">
				<div className="data">
					<div className="entry">
					<label className="username" for="username">Username:</label>
					<input className="username entry-input" type="password" name="username" id="username"
					       onKeyDown={this.onClockInOutKey} onChange={this.onUsername} />
					<label className="password" for="password">Password:</label>
					<input className="password entry-input" type="password" name="password" id="password"
					       onKeyDown={this.onClockInOutKey} onChange={this.onPassword} />
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