/*
* this is the entry js file for the application.
* */

// require react and react-dom render for use in creating the react component and rendering the JSX
var React = require('react');
var render = require('react-dom').render;

// require the components this application uses; see where in the JSX of the render function
var TouchscreenHeader = require('./components/TouchscreenHeader/TouchscreenHeader');
var TouchscreenFooter = require('./components/TouchscreenFooter/TouchscreenFooter');
var AttendanceClock = require('./components/AttendanceClock/AttendanceClock');
var AttendanceClockInOut = require('./components/AttendanceClockInOut/AttendanceClockInOut');

// require the postcss styles. This compiles and loads them in a style tag on the page
require('./style/main.scss');

class App extends React.Component {
	render () {
		return (
			<div className="container">
				<TouchscreenHeader />
				<main className="main">
					<AttendanceClock width="400" height="400" />
					<AttendanceClockInOut />
				</main>
				<TouchscreenFooter />
			</div>
		);
	}
}
/**/

// render the App component on the page's app element
render(<App/>, document.getElementById('app'));
