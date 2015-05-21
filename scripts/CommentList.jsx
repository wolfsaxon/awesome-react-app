var React = require('react');
var Radium = require('radium');
var Comment = require('./Comment.jsx');

// BUG: using Radium.wrap() here breaks rendering of comment nodes
var CommentList = React.createClass({
  render: function() {

    var commentNodes = this.props.data.map(function(comment, index) {
      return (
        <Comment author={comment.author} key={index}>
          {comment.text}
        </Comment>
      );
    });

    return (
      <div className="commentList">
        {commentNodes}
      </div>
    );
  }
});

module.exports = CommentList;