/**
 * Created by Zashy on 1/22/2016.
 */

// include react
var React = require('react');

// create the PaperlessLogo react component
class PaperlessLogo extends React.Component {
	// define the constructor
	constructor(props){
		// call the parent's constructor
		super(props);
	}
	// render function to render the jsx of the page
	render(){
		// create a style object to use the height and width properties from the props
		let logoStyle = {
			width: this.props.width + 'px',
			height: this.props.height + 'px'
		};
		// return the svg logo with the height and width set
		return (
			<svg className="ppl-logo" data-name="Layer 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 217.24 106.68" style={logoStyle}>
				<g>
					<path className="outer-p" d="M414.51,218.92L332.86,274s55.52,7.05,95.6,15,46.93,10.22,46.93,10.22L458,286.18,344.12,272.83,421.26,223Z" transform="translate(-272.49 -201.51)"/>
					<path className="outer-l" d="M367.87,204.29c-40.75,4.48-75.95,13.45-95.38,23.25,20.33-6.63,49.21-12.55,81.54-16.1,63.17-6.94,115.52-2.25,116.91,10.48S422.27,250.6,359.1,257.54c-17.92,2-35,3-50.24,3.18a415.4,415.4,0,0,0,64.95-2.38c63.17-6.94,113.05-24.67,111.41-39.59S431,197.35,367.87,204.29Z" transform="translate(-272.49 -201.51)"/>
				</g>
				<g>
					<path className="inner-p" d="M419,227.88L337.34,283s55.52,7.05,95.6,15,46.93,10.22,46.93,10.22l-17.39-13.05L348.6,281.78,425.73,232Z" transform="translate(-272.49 -201.51)"/>
					<path className="inner-l" d="M372.35,213.25C331.59,217.73,296.4,226.7,277,236.5c20.33-6.63,49.21-12.55,81.54-16.1,63.17-6.94,115.52-2.25,116.91,10.48s-48.68,28.68-111.85,35.62c-17.92,2-35,3-50.24,3.18a415.41,415.41,0,0,0,64.95-2.38c63.17-6.94,113.05-24.67,111.41-39.59S435.52,206.31,372.35,213.25Z" transform="translate(-272.49 -201.51)"/>
				</g>
			</svg>
		);
	}
}

// exports the component
module.exports = PaperlessLogo;