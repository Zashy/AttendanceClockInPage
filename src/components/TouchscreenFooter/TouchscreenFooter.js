/**
 * Created by Zashy on 1/21/2016.
 */

// require react
var React = require('react');

// create the TouchscreenFooter react component
class TouchscreenFooter extends React.Component {
	// define the constructor
	constructor(props){
		// call the parent's constructor
		super(props);
	}
	// render function to render the jsx of the page
	render(){
		return (
			<footer className="footer">
				<hr />
				<div className="flex-container">
					<div className="left">
						<button>Home</button>
						<button>Back</button>
					</div>
					<div className="right">
					</div>
				</div>
			</footer>
		);
	}
}

// exports the component
module.exports = TouchscreenFooter;