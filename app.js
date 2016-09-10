var express = require("express");
var routes = require('./routes');
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var User = require('./models/userMessage');

mongoose.connect('mongodb://localhost:27017/restproject');
var db = mongoose.connection;

var allUsers = {};
 
setInterval(function() {
  updateBoard();
}, 5000);

io.on('connection', function(socket){
	socket.on('chatMessage', function(package){
		addUser(package);
	});
	socket.on('newUser', function(package){
		addUser(package);
	});
});

var addUser = function(package){
	dealWithPackage(package);
}

var updateBoard = function(){
	io.emit('updateBoard', allUsers);
}

dealWithPackage = function(package)
{
	package = JSON.parse(package);
	var uuid = package.how;
	var message = package.what;

	User.find({ userid: uuid , text: message}, function(err, results) {
	  if (err) throw err;
	    if (!results.length) {
        	var gps = package.where;
			var lat = gps.lat;
			var long = gps.lng;
			var date = package.when;
			var newUser = new User({
					 	userid:uuid,
						text:message,
						location:{
							lat:lat,
							long:long
						},
						createddate:date
					});
			newUser.save(function(err) {
			  if (err) console.error(err);
			  else
			  	{
		  			console.log('New message');
		  			if(uuid in allUsers) allUsers[uuid].values = {what:message,where:gps,when:date};
				  	else allUsers[uuid] = {what:message,where:gps,when:date};
			  	}
			});
    	}
	});
}

http.listen(3000, function(){
  console.log('listening on *:3000, Bitch');
});
