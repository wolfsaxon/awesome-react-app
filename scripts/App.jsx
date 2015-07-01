var React = require('react');
var Radium = require('radium');
var Request = require('superagent');
var Style = Radium.Style;

var Gear = require('./Gear.jsx');

var App = React.createClass({

	getInitialState: function(){
		return {
			gear: []
		}
	},

	_displayGear: function(){
		
		Request
			.get("http://localhost:3001/gear")
			.end(function(err, res){
				var data = res.body;

				// Custom code here
				this.setState({
					gear : data
				});

				console.log('Data from server: ');
				console.log(data);
				
			}.bind(this));

	},

	_displayAccountButton: function(give_login){
		var signed_in = "Sign out";
		var signed_out = 'Sign in';

		if  (give_login) {
			var login = " " + signed_in;
		}else{
			var login = sign_in;
		}
		return login;
	},

	_getName: function(give_last_name){
		// Fancy code to get name from database ...
		var first_name = 'Jake';
		var last_name = 'Saxon';

		if (give_last_name) {
			var name = first_name + ' ' + last_name;
		}else{
			var name = first_name;
		}

		return name;
	},

	componentDidMount: function(){
		this._displayGear();
	},

	render: function() {

		var name = this._getName(false);

		var navBarStyle = {
			backgroundColor : '#efefef',
			borderBottom : '1px solid #ccc',
			padding: '20px',
			marginBottom: '20px',
			fontSize: '32px',
			borderRadius: '10px',
			fontFamily: 'helvetica'
		};

		var nameStyle = {
			color: 'red',
		}

    	return (
			<div>
				<div style={navBarStyle}>
					<div style={nameStyle}>
						{name}
					</div>
				</div>

				<div>
					{ this.state.gear.length > 0 &&
						<Gear gearData={this.state.gear}></Gear>
					}
				</div>

				<div>
					
				</div>

			</div>
		)
	}
});

module.exports = App;