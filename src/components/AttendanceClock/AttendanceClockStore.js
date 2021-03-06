/**
 * Created by Zashy on 1/22/2016.
 */

// require the objects needed
var AppDispatcher = require('../../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var constants = require('../../common/constants');

var date = '',
	fetchResult = '';

// refresh function. This is what would be updated to call an external REST api
function _refreshDateFromServer(callback){
	//date = new Date("January, 29 2016 20:03:33");
	_fauxFetch(callback);
	return date;
}

function _fauxFetch(callback){
	const encodedURL = './fauxResponse.json';

	let header = new Headers();
	let init = {
		method: 'GET',
		headers: header,
		mode: 'cors'
	};

	// the new javascript fetch, uses a polyfill to emulate the functionality
	fetch(encodedURL, init).then(function(response){
		if(response.status>=200 && response.status<300) {
			return response.json();
		}
		throw new error("Status not OK");
	}).then(function(results){
		fetchSuccess(results);
		callback();
	}).catch(function(error){
		fetchError(error);
		callback();
	});
}

// what to do with the fetch results on success
function fetchSuccess(result){
	fetchResult = 'success';
	date = new Date(result.date);
}
// what to do on error
function fetchError(error){
	fetchResult = 'failure';
	// var errorMessage = error.message idk what the api returns
	date = '0';
}

function _incrementDate(callback){
	date.setSeconds(date.getSeconds() + 1);
	callback();
}

// creates the store class/object using object.assign to get the methods from the eventemitter prototype
var AttendanceClockStore = assign({}, EventEmitter.prototype, {

	getDate: function(){
		if(date === ''){
			// temporarily give it the current date to allow page to load, it will update nearly immediately when the fetch succeeds
			date = new Date();
			_refreshDateFromServer(AttendanceClockStore.emitChange.bind(AttendanceClockStore));
		}
		return date;
	},
	// emites the change event for components to know to update
	emitChange: function(){
		this.emit('change');
	},
	// allows components to subscribe to the change event
	addChangeListener: function(callback) {
		this.on('change', callback);
	},
	// allows components to unsubscribe
	removeChangeListener: function(callback) {
		this.removeListener('change', callback);
	},
	// handles dispatched events from the actions
	dispatcherIndex: AppDispatcher.register(function(payload) {

		switch(payload.actionType){
			case constants.CLOCK_REFRESH:
				_refreshDateFromServer(AttendanceClockStore.emitChange.bind(AttendanceClockStore));
				break;
		}

		return true; // No errors. Needed by promise in Dispatcher.
	})

});


module.exports = AttendanceClockStore;