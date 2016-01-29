/**
 * Created by Zashy on 1/25/2016.
 */

var React = require('react');
// constants ccontains colours for drawing the clock
var constants = require('../../common/constants');

class Clock extends React.Component {
	// define the constructor
	constructor(props) {
		// call the parent's constructor
		super(props);
	}

	render(){
		// return the canvas with the height and width set from the props
		return (
			<canvas className="canvas-clock" width={this.props.width} height={this.props.height}>
			</canvas>
		);
	}

	// react calls this once when the component first mounts on the page
	componentDidMount() {
		this.drawClock();
	}
	// react calls this every time new property values are recieved
	componentWillReceiveProps(){
		this.drawClock();
	}
	// draws the clock
	drawClock(){
		this.canvas = document.getElementsByClassName('canvas-clock')[0];
		this.ctx = this.canvas.getContext('2d');
		this.percent = Math.min(this.props.width, this.props.height)*0.40;

		this.ctx.clearRect(0, 0, this.props.width, this.props.height);
		this.ctx.lineWidth = this.percent*0.01;

		this.drawDials();
		this.drawHourMarks();
		this.drawSecondMarks();
		this.drawHourText();

		this.drawSecondHand();
		this.drawMinuteHand();
		this.drawHourHand();

		this.drawCenterPoint();
	}

	// and all the math for the 2d canvas below
	drawDials() {
		this.ctx.beginPath();
		this.ctx.arc(this.props.width / 2, this.props.height / 2, (this.percent*1.2), 0, Math.PI * 2);
		this.ctx.strokeStyle = constants.CLK_CIRCLE_COLOURS;
		this.ctx.stroke();

		this.ctx.beginPath();
		this.ctx.arc(this.props.width / 2, this.props.height / 2, (this.percent*1.17), 0, Math.PI * 2);
		this.ctx.strokeStyle = constants.CLK_CIRCLE_COLOURS;
		this.ctx.stroke();
	}
	drawCenterPoint() {
		this.ctx.beginPath();
		this.ctx.arc(this.props.width / 2, this.props.height / 2, this.percent*0.02, 0, Math.PI * 2);
		this.ctx.lineWidth = this.percent*0.04;
		this.ctx.fillStyle = constants.CLK_CIRCLE_COLOURS;
		this.ctx.strokeStyle = constants.CLK_CIRCLE_COLOURS;
		this.ctx.stroke();
	}

	drawHourMarks() {

		for (var i = 0; i < 12; i++) {
			this.angle = i * (Math.PI * 2) / 12;
			this.ctx.lineWidth = this.percent*0.03;
			this.ctx.beginPath();

			var x1 = (this.props.width / 2) + Math.cos(this.angle) * (this.percent);
			var y1 = (this.props.height / 2) + Math.sin(this.angle) * (this.percent);
			var x2 = (this.props.width / 2) + Math.cos(this.angle) * (this.percent - (this.percent / 7));
			var y2 = (this.props.height / 2) + Math.sin(this.angle) * (this.percent - (this.percent / 7));

			this.ctx.moveTo(x1, y1);
			this.ctx.lineTo(x2, y2);

			this.ctx.strokeStyle = constants.CLK_HOUR_MARKS;
			this.ctx.stroke();
		}
	}
	drawHourText(){
		for (var i = 0; i < 12; i++) {
			this.angle = i * (Math.PI * 2) / 12;
			var hour = (i+3)%12;
			hour = (hour == 0) ? 12 : hour;

			var xt = (this.props.width / 2) + Math.cos(this.angle) * (this.percent*1.04);
			var yt = (this.props.height / 2) + Math.sin(this.angle) * (this.percent*1.04);

			switch(hour){
				case 1:
					xt=xt-this.percent*0.03;
					break;
				case 3:
					yt=yt+this.percent*0.04;
					break;
				case 4:
					yt=yt+this.percent*0.06;
					break;
				case 5:
					xt=xt-this.percent*0.02;
					yt=yt+this.percent*0.08;
					break;
				case 6:
					xt=xt-this.percent*0.03;
					yt=yt+this.percent*0.09;
					break;
				case 7:
					xt=xt-this.percent*0.04;
					yt=yt+this.percent*0.09;
					break;
				case 8:
					xt=xt-this.percent*0.06;
					yt=yt+this.percent*0.06;
					break;
				case 9:
					xt=xt-this.percent*0.06;
					yt=yt+this.percent*0.04;
					break;
				case 10:
					xt=xt-this.percent*0.11;
					yt=yt+this.percent*0.03;
					break;
				case 11:
					xt=xt-this.percent*0.07;
					yt=yt+this.percent*0.01;
					break;
				case 12:
					xt=xt-this.percent*0.07;
					break;
			}

			this.ctx.fillStyle = constants.CLK_TEXT_COLOUR;
			this.ctx.font=(this.percent*0.12)+"px Arial"
			this.ctx.fillText(hour, xt, yt);
		}
	}

	drawSecondMarks() {

		for (var i = 0; i < 60; i++) {
			if(i%5 != 0){
				this.angle = i * (Math.PI * 2) / 60;       // THE ANGLE TO MARK.
				this.ctx.lineWidth = this.percent*0.02;            // HAND WIDTH.
				this.ctx.beginPath();

				var x1 = (this.props.width / 2) + Math.cos(this.angle) * (this.percent);
				var y1 = (this.props.height / 2) + Math.sin(this.angle) * (this.percent);
				var x2 = (this.props.width / 2) + Math.cos(this.angle) * (this.percent - (this.percent / 30));
				var y2 = (this.props.height / 2) + Math.sin(this.angle) * (this.percent - (this.percent / 30));

				this.ctx.moveTo(x1, y1);
				this.ctx.lineTo(x2, y2);

				this.ctx.strokeStyle = constants.CLK_SECOND_MARKS;
				this.ctx.stroke();
			}
		}
	}

	drawSecondHand() {

		var sec = this.props.date.getSeconds();
		this.angle = ((Math.PI * 2) * (sec / 60)) - ((Math.PI * 2) / 4);
		this.ctx.lineWidth = this.percent*0.01; // HAND WIDTH.

		this.ctx.beginPath();
		// START FROM CENTER OF THE CLOCK.
		this.ctx.moveTo(this.props.width / 2, this.props.height / 2);
		// DRAW THE LENGTH.
		this.ctx.lineTo((this.props.width / 2 + Math.cos(this.angle) * this.percent),
			this.props.height / 2 + Math.sin(this.angle) * this.percent);

		// DRAW THE TAIL OF THE SECONDS HAND.
		// START FROM CENTER.
		this.ctx.moveTo(this.props.width / 2, this.props.height / 2);
		// DRAW THE LENGTH.
		this.ctx.lineTo((this.props.width / 2 - Math.cos(this.angle) * 20),
			this.props.height / 2 - Math.sin(this.angle) * 20);

		this.ctx.strokeStyle = constants.CLK_SECOND_HAND; // COLOR OF THE HAND.
		this.ctx.stroke();
	}

	drawMinuteHand() {

		var min = this.props.date.getMinutes();
		this.angle = ((Math.PI * 2) * (min / 60)) - ((Math.PI * 2) / 4);
		this.ctx.lineWidth = this.percent*0.02; // HAND WIDTH.

		this.ctx.beginPath();
		this.ctx.moveTo(this.props.width / 2, this.props.height / 2); // START FROM CENTER.
		// DRAW THE LENGTH.
		this.ctx.lineTo((this.props.width / 2 + Math.cos(this.angle) * this.percent / 1.1),
			this.props.height / 2 + Math.sin(this.angle) * this.percent / 1.1);

		this.ctx.strokeStyle = constants.CLK_MINUTE_HAND; // COLOR OF THE HAND.
		this.ctx.stroke();
	}

	drawHourHand() {

		var hour = this.props.date.getHours();
		var min = this.props.date.getMinutes();
		this.angle = ((Math.PI * 2) * ((hour * 5 + (min / 60) * 5) / 60)) - ((Math.PI * 2) / 4);
		this.ctx.lineWidth = this.percent*0.03; // HAND WIDTH.

		this.ctx.beginPath();
		this.ctx.moveTo(this.props.width / 2, this.props.height / 2); // START FROM CENTER.
		// DRAW THE LENGTH.
		this.ctx.lineTo((this.props.width / 2 + Math.cos(this.angle) * this.percent / 1.5),
			this.props.height / 2 + Math.sin(this.angle) * this.percent / 1.5);

		this.ctx.strokeStyle = constants.CLK_HOUR_HAND; // COLOR OF THE HAND.
		this.ctx.stroke();
	}
};

// exports the component
module.exports = Clock;