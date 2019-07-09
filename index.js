const express = require('express');
const socket = require("socket.io");

const app = express();

// Create server
const PORT = 5000;
const server = app.listen(PORT, () => {
	console.log('Server is running on port ', PORT);
});

// Serve static files
app.use(express.static('public'));

// Socket setup and pass server
const io = socket(server);
io.on('connection', (socket) => {
	console.log('made socket connection', socket.id)

	// Handle chat event
	socket.on('chat', (data) => {
		io.sockets.emit('chat', data)
	});

	// Handle typing event
	socket.on('typing', (data) => {
		socket.broadcast.emit('typing', data)
	});
});