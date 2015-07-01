var React = require('react');
var Radium = require('radium');
var Style = Radium.Style;

var Gear = React.createClass({
	
	render: function() {

		var gearHtml = this.props.gearData.map(function(item){
			return (
		
				<div style={{ border: '1px solid #ccc', margin: '0px', color: 'grey', borderRadius: "10px"}}>	
					<div>{item.name}</div>
					<div>{item.weight}</div>
					<div>{item.big_item}</div>
					<div>{item.gender}</div>
				</div>	

			)
		});

    	return (
			<div>
				{gearHtml}
			</div>
		)
	}
});

module.exports = Gear;