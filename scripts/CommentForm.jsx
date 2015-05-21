var React = require('react');
var Radium = require('radium');

var CommentForm = React.createClass(Radium.wrap({
  handleSubmit: function(e) {
    e.preventDefault();
    var author = React.findDOMNode(this.refs.author).value.trim();
    var text = React.findDOMNode(this.refs.text).value.trim();
    if (!text || !author) {
      return;
    }
    this.props.onCommentSubmit({author: author, text: text});
    React.findDOMNode(this.refs.author).value = '';
    React.findDOMNode(this.refs.text).value = '';
  },
  render: function() {

    var styles = {
      input: {
        fontSize: '1.4em',
        padding: '0.4em 0.5em',
        marginRight: '1em'
      }
    };

    return (
      <form className="commentForm" onSubmit={this.handleSubmit}>
        <input style={[ styles.input ]} type="text" placeholder="Your name" ref="author" />
        <input style={[ styles.input ]} type="text" placeholder="Say something..." ref="text" />
        <input style={[ styles.input ]} type="submit" value="Post" />
      </form>
    );
  }
}));

module.exports = CommentForm;