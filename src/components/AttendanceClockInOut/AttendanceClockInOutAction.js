/**
 * Created by Zashy on 1/24/2016.
 */

// include the app dispatcher
var AppDispatcher = require('../../dispatcher/AppDispatcher');
var constants = require('../../common/constants');

// create the object AttendanceClockInOutAction with a refresh function
var AttendanceClockInOutAction = {
	// refresh action dispatches the refresh action to the store
	clockInOut: function(username, password){
		AppDispatcher.dispatch({
			actionType: constants.ATN_CLOCK_IN_OUT,
			username: username,
			password: password
		});
	},
	checkStatus: function(username, password){
		AppDispatcher.dispatch({
			actionType: constants.ATN_CHECK_STATUS,
			username: username,
			password: password
		});
	},
	updateUsername: function(username){
		AppDispatcher.dispatch({
			actionType: constants.ATN_UPDATE_USER,
			username: username
		});
	},
	updatePassword: function(password){
		AppDispatcher.dispatch({
			actionType: constants.ATN_UPDATE_PASS,
			password: password
		});
	}
};

// exports this object
module.exports = AttendanceClockInOutAction;