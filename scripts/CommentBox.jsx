var React = require('react');
var Radium = require('radium');
var request = require('superagent');
var ReactAsync = require('react-async');
var CommentForm = require('./CommentForm.jsx');
var CommentList = require('./CommentList.jsx');

var CommentBox = React.createClass(Radium.wrap({
  
  mixins: [ ReactAsync.Mixin ],

  /*
  // Using getInitialStateAsync instead (see below)
  getInitialState: function(){
    return {
      data: []
    };
  },
  */

  // Added by ReactAsync.Mixin.
  // So server-side rendering knows to wait for async requests to finish before outputting page.
  getInitialStateAsync: function(callback) {
    this.loadCommentsFromServer(function(state) {
      callback(null, state)
    }.bind(this));
  },

  getDefaultProps: function() {
    return {
      maxShownComments: 4
    }
  },
  truncateComments: function(data){
    if (data.length >= this.props.maxShownComments)
      return data.slice(data.length - this.props.maxShownComments, data.length);

    return data;
  },
  loadCommentsFromServer: function(callback) {

    var self = this;

    request
      .get(this.props.url)
      .end(function(err, res){

          if (err){
            console.error(self.props.url, err.status, err.toString());
          }else{
            var data = self.truncateComments(res.body);

            if (callback){
              callback( { data: data } );
            }else{
              self.setState( { data: data } );
            }
          }
      });
  },
  handleCommentSubmit: function(comment) {

    var self = this;

    var comments = this.state.data.slice(0); // Clone state
    comments.push(comment);
    comments = this.truncateComments(comments);
      
    this.setState({data: comments});

    request
      .post(this.props.url)
      .set('Content-Type', 'application/json')
      .send(comment)
      .end(function(err, res){
          if (err){
            console.error(self.props.url, err.status, err.toString());
          }
      });
  },

  componentDidMount: function() {
    
    // Fetch comments if not preloaded (rendered server-side)
    if (!this.state.data)
      this.loadCommentsFromServer();

    // No need to poll currently since no one else is writing to file
    //setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      <div>
        <h1>Comments</h1>
        { this.state.data && 
          <CommentList data={this.state.data} />
        }
        <CommentForm onCommentSubmit={this.handleCommentSubmit} />
      </div>
    );
  }
}));




module.exports = CommentBox;