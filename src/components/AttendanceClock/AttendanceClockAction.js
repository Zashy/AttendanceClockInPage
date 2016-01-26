/**
 * Created by Zashy on 1/22/2016.
 */

// include the app dispatcher
var AppDispatcher = require('../../dispatcher/AppDispatcher');
var constants = require('../../common/constants');

// create the object AttendanceClockAction with a refresh function
var AttendanceClockAction = {
	// refresh action dispatches the refresh action to the store
	refreshServer: function(){
		AppDispatcher.dispatch({
			actionType: constants.CLOCK_REFRESH
		});
	}
};

// exports this object
module.exports = AttendanceClockAction;