/**
 * Created by Zashy on 1/21/2016.
 */

// require react and the PaperlessLogo component
var React = require('react');
var PaperlessLogo = require('../PaperlessLogo/PaperlessLogo.js');

// create the TouchscreenHeader react component
class TouchscreenHeader extends React.Component {
	// define the constructor
	constructor(props){
		// call the parent's constructor
		super(props);
	}
	// render function to render the jsx of the page
	/* puts the PaperlessLogo component on the page with a width and height props set */
	render(){
		return (
			<header className="header">
				<div className="left">
					<h1 className="heading">Record Attendance</h1>
					<div className="details">Enter your username then press enter to click in/out, or check status to view the clocked in status.</div>
				</div>
				<div className="right">
					<PaperlessLogo width="108" height="50" />
					<div className="information">[user] on Site: [site]</div>
				</div>
			</header>
		);
	}
}

// exports the component
module.exports = TouchscreenHeader;