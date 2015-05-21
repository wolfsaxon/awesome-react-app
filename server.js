var path = require('path');
var express = require('express');
var compression = require('compression'); // Compress middleware for express
var jsonServer = require('json-server');
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');
var React = require('react');
var ReactAsync = require('react-async');


require("babel/register"); // So that we can require jsx

var LayoutComponent = require('./scripts/Layout.jsx');
var AppComponent = require('./scripts/App.jsx');


// ************************************ //
// ******** WEBPACK DEV SERVER ******** //
// ************************************ //

// Open in browser: http://localhost:3000
// This gives us automatic bundling and page updating (Hot Module Replacement)
var devServer = new WebpackDevServer(webpack(config), {
  contentBase: "public",
  publicPath: config.output.publicPath,
  hot: true,
  // Proxy request to our app server
  // This way we don't have to re-implement routes, server-side rendering, etc here as well.
  // This just adds hot reloading and requests still go to our app server
  proxy: {
  	"*": "http://localhost:8080" 
  }
})
devServer.listen(3000, 'localhost', function (err, result) {
  if (err) {
    console.log(err);
  }
  console.log('Listening at localhost:3000');
});


// ************************************ //
// ************* DATABASE ************* //
// ************************************ //

// File-based REST API for prototyping
// https://github.com/typicode/json-server
// Returns an Express server
var api = jsonServer.create();
var router = jsonServer.router('db.json'); 

api
	.use(jsonServer.defaults) // logger, static and cors middlewares
	.use(router) // Mount router
	.listen(3001, function() { 
  	console.log('Server started: localhost:3001');
});


// ************************************ //
// ************ APP SERVER ************ //
// ************************************ //


var app = express();


// Pre-render react app + fetch async data
// Waits until callback passed from getInitialStateAsync() to async success handler is called before returning page
app.get('/', function(req, res){

  var renderAsyncData = (req.query.renderAsyncData === "false" ? false : true);

  if (renderAsyncData){

	  ReactAsync.renderToStringAsync(
			React.createElement(AppComponent, {}),
	  		function(err, markup){  

				var html = React.renderToStaticMarkup(
					React.createElement(LayoutComponent, {
						title: 'Test Title',
	    			markup: markup
	    		})
				);

	  		res.send(html); 
	   	}
	  );

   }else{

   	// Pre-render react app, but no async (ajax) data is fetched
    var html = React.renderToStaticMarkup(
    	React.createElement(LayoutComponent, {
    		title: 'Test Title',
	        markup: React.renderToString(
	        	React.createElement(AppComponent, {})
	        )
      })
    );

    res.send(html);
   } 
     	 
});



app
	.use(compression())
	.use('/', express.static(path.join(__dirname, 'public')))
	.listen(8080);

