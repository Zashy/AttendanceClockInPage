/**
 * Created by Zashy on 1/24/2016.
 */

// require the app dispatcher and event emitter for the store component
var AppDispatcher = require('../../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;

// require the object-assign polyfill
var assign = require('object-assign');

// require the constants for the project, includes action types
var constants = require('../../common/constants');

// variables to pass around the username and password
var username = '',
	password = '';

// this is where another call to an external API would go to check the username and password and check the status
function _checkStatus(callback){
	if(username === '10' && password === '10'){
		callback('success', 'clocked out');
	}else{
		callback('error', 'database not found')
	}
}

// this is where another call to an external API would go to check the username and password and clock the user in or out
function _clockInOut(callback){
	if(username === '10' && password === '10'){
		callback('success', 'clock in');
	}else{
		callback('error', 'invalid username / password')
	}
}
// ses the username
function setUsername(user){
	username = user;
}
// sets the password
function setPassword(pass){
	password = pass;
}
// creates the react store component. assign merges the variables from the EventEmitter into this object
var AttendanceClockInOutStore = assign({}, EventEmitter.prototype, {
	status: '',
	result: '',
	// returns the status
	getStatus: function(){
		return this.status;
	},
	// returns the result
	getResult: function(){
		return this.result;
	},
	//returns the username that was verified
	getUsername: function(){
		return username;
	},
	// emites the change event to update any components of changes to the date in the store
	emitChange: function(){
		this.emit('change');
	},
	// callback to emit the change after getting the results of a clock in/out
	clockInOutResult: function(status, result){
		this.status = status;
		this.result = result;
		this.emitChange();
	},
	// callback to emit the change after getting the results of a check status
	checkStatusResult: function(status, result){
		this.status = status;
		this.result = result;
		this.emitChange();
	},
	// allows components to register callbacks to the store's change event
	addChangeListener: function(callback) {
		this.on('change', callback);
	},
	// allows the components to unregister callbacks to the store's change event
	removeChangeListener: function(callback) {
		this.removeListener('change', callback);
	},
	// registers to the action's events and handles the events using the data/payload they return
	dispatcherIndex: AppDispatcher.register(function(payload) {
		var username = '', password = '';
		if(typeof payload.username != 'undefined') {
			var username = payload.username.trim();
		}
		if(typeof payload.password != 'undefined') {
			var password = payload.password.trim();
		}
		// determine which action it is, and what to do with each one
		switch(payload.actionType){
			case constants.ATN_CLOCK_IN_OUT:
				_clockInOut(AttendanceClockInOutStore.clockInOutResult.bind(AttendanceClockInOutStore));
				break;
			case constants.ATN_CHECK_STATUS:
				_checkStatus(AttendanceClockInOutStore.checkStatusResult.bind(AttendanceClockInOutStore));
				break;
			case constants.ATN_UPDATE_USER:
				setUsername(username);
				break;
			case constants.ATN_UPDATE_PASS:
				setPassword(password);
				break;
		}

		return true; // No errors. Needed by promise in Dispatcher.
	})

});


module.exports = AttendanceClockInOutStore;