var React = require('react');
var render = require('react-dom').render;
var TouchscreenHeader = require('./components/TouchscreenHeader/TouchscreenHeader');
var TouchscreenFooter = require('./components/TouchscreenFooter/TouchscreenFooter');
var AttendanceClock = require('./components/AttendanceClock/AttendanceClock');
var AttendanceClockInOut = require('./components/AttendanceClockInOut/AttendanceClockInOut');

require('./style/main.css');

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

render(<App/>, document.getElementById('app'));
