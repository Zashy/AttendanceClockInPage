/**
 * Created by Zashy on 1/24/2016.
 */

var AppDispatcher = require('../../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var constants = require('../../common/constants');

var username = '',
	password = '';

function _checkStatus(callback){
	if(username === '10' && password === '10'){
		callback('success', 'clocked out');
	}else{
		callback('error', 'database not found')
	}
}
function _clockInOut(callback){
	if(username === '10' && password === '10'){
		callback('success', 'clock in');
	}else{
		callback('error', 'invalid username / password')
	}
}
function setUsername(user){
	username = user;
}
function setPassword(pass){
	password = pass;
}

var AttendanceClockInOutStore = assign({}, EventEmitter.prototype, {
	status: '',
	result: '',
	getStatus: function(){
		return this.status;
	},
	getResult: function(){
		return this.result;
	},
	getUsername: function(){
		return username;
	},
	emitChange: function(){
		this.emit('change');
	},
	clockInOutResult: function(status, result){
		this.status = status;
		this.result = result;
		this.emitChange();
	},
	checkStatusResult: function(status, result){
		this.status = status;
		this.result = result;
		this.emitChange();
	},

	addChangeListener: function(callback) {
		this.on('change', callback);
	},

	removeChangeListener: function(callback) {
		this.removeListener('change', callback);
	},

	dispatcherIndex: AppDispatcher.register(function(payload) {
		var username = '', password = '';
		if(typeof payload.username != 'undefined') {
			var username = payload.username.trim();
		}
		if(typeof payload.password != 'undefined') {
			var password = payload.password.trim();
		}

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