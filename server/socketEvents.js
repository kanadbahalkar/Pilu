var request = require('request');
var url = require('url');
var config = require('./config/main');

request.defaults({
	strictSSL: false, // allow us to use our self-signed cert for testing
	rejectUnauthorized: false
});

exports = module.exports = function (io) {

	//Create array of live sockets
	var sockets = {};

	// Set socket.io listeners.
	io.on('connection', function (socket) {

		var socketID;
		
		//Emit a starter event when a new connection occurs
		socket.emit('serve', 'incoming user');

		//On receiving a reply from the connection, check who is connected
		socket.on('return', function (data) {

		});

		socket.on('user is live', function(data){
			//Funnel this data into analytics data repo
		});
		
		socket.on('new like', function (data) {
			//Update ui to reflect the activity (like / meh / comment / comment typing / blyak)
		});

		//When a user disconnects or closes the window/tab
		socket.on('disconnect', function () {
			//Funnel this data into analytics data repo
			delete sockets.disconnectedSocket;
		});
	});
}
