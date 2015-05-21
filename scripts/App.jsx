var CommentBox = require('./CommentBox.jsx');
var React = require('react');
var Radium = require('radium');
var Style = Radium.Style;

var App = React.createClass({

	render: function() {
    	return (
			<div>

				<CommentBox
					url="http://localhost:3001/comments"
					pollInterval={2000} />

				<Style rules={[
				  {
				    body: {
				      background: '#fff',
				      fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
				      fontSize: '15px',
				      lineHeight: 1.7,
				      margin: 0,
				      padding: '30px'
				    }
				  },
				  {
				    a: {
				      color: '#4183c4',
				      textDecoration: 'none'
				    }
				  },
				  {
				    'a:hover': {
				      color: 'green',
				      textDecoration: 'underline'
				    }
				  }
				]} />

			</div>
		)
	}
});

module.exports = App;