var React = require('react');

// Used for server-side rendering (not)
var Layout = React.createClass({
 
  render: function() {
    return (
      <html>
        <head>
          <title>{this.props.title}</title>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, user-scalable=no" />
        </head>
        <body>
          <div id="content" dangerouslySetInnerHTML={{__html: this.props.markup}}></div>
          <script type="text/javascript" src="bundle.js" charSet="utf-8"></script>
        </body>
      </html>
    );
  }
});

module.exports = Layout;