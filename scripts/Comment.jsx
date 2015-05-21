var marked = require('marked');
var React = require('react');
var Radium = require('radium');

var Comment = React.createClass(Radium.wrap({
  render: function() {

    var styles = {
      comment: {
        backgroundColor : '#efefef',
        borderBottom : '1px solid #ccc',
        marginBottom : '1em',
        padding : '1em 0 1em 1.5em'
      },
      author: {
        fontSize : '2em',
        fontWeight : 'bold'
      }
    };

    var rawMarkup = marked(this.props.children.toString(), {sanitize: true});
    
    return (
      <div style={[ styles.comment ]}>
        <div style={[ styles.author ]}>
          <a href="#">{this.props.author}</a>
        </div>
        <span dangerouslySetInnerHTML={{__html: rawMarkup}} />
      </div>
    );
  }
}));

module.exports = Comment;