// 'use strict';

// const express = require('express');
// const socketIO = require('socket.io');
// const path = require('path');

// const PORT = process.env.PORT || 3000;
// const INDEX = path.join(__dirname, 'index.html');

// const server = express()
//   .use((req, res) => res.sendFile(INDEX) )
//   .listen(PORT, () => console.log(`Listening on ${ PORT }`));

// const io = socketIO(server);
// var middleware = require('socketio-wildcard')();

// io.use(middleware)

// io.on('connection', (socket) => {
//   console.log('Client connected');
//   var clientIpAddress = socket.request.headers['x-forwarded-for'] || socket.request.connection.remoteAddress;
//   console.log(' new request from : '+clientIpAddress);
//   socket.on('disconnect', () => console.log('Client disconnected'));
//   socket.on('*', function(packet){
//     console.log('packet received', packet);
//     if (packet.data) {
//       console.log('packet data', packet.data);
//     }
//   });
// });

// io.on('data', function(data) {
//   console.log('received data:' + data);
//   io.emit('msg', data);
// })

// io.on("*", function(input) {
//   io.emit('msg', input.toString())
// })

// io.on('data', function(data) {
//   console.log('data received', data);
// })

var net = require('net');

const port = process.env.PORT || 3000;

var server = net.createServer(function(socket) {
  console.log('connection made')
	socket.write('Echo server\r\n');
  socket.pipe(socket);
  socket.on('data', function(data) {
    console.log('received data: ' + data);
  })
});

server.listen(port);