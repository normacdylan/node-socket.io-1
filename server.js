'use strict';

const express = require('express');
const socketIO = require('socket.io');
const path = require('path');

const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, 'index.html');

const server = express()
  .use((req, res) => res.sendFile(INDEX) )
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

const io = socketIO(server);

io.on('connection', (socket) => {
  console.log('Client connected');
  socket.on('disconnect', () => console.log('Client disconnected'));
  io.emit('someone connected')
  socket.emit('you are connected')
  io.emit('msg', `${socket.toString()} joined`)
  // socket.use((packet, next) => {
  //   console.log('Received something: ' + packet.toString());
  // })
});

io.on('data', function(data) {
  io.emit('msg', data);
})

io.on("*", function(input) {
  io.emit('msg', input.toString())
})

io.on('data', function(data) {
  console.log('data received', data);
})

// setInterval(() => io.emit('time', new Date().toTimeString()), 1000);

// var net = require('net');

// const port = process.env.PORT || 3000

// var server = net.createServer(function(socket) {
// 	socket.write('Echo server\r\n');
// 	socket.pipe(socket);
// });

// // server.listen(3000, 'https://powerful-garden-58783.herokuapp.com/');
// // server.listen(port, '34.202.247.40');
// server.listen(port);

// 'use strict';

// const express = require('express');
// const WebSocketServer = require('ws').Server;
// const path = require('path');

// const PORT = process.env.PORT || 3000;
// const INDEX = path.join(__dirname, 'index.html');

// const server = express()
//   .use((req, res) => res.sendFile(INDEX) )
//   .listen(PORT, () => console.log(`Listening on ${ PORT }`));

// const wss = new WebSocketServer({ server });

// wss.on('connection', (ws) => {
//   console.log('Client connected');
//   ws.on('close', () => console.log('Client disconnected'));
// });

// setInterval(() => {
//   wss.clients.forEach((client) => {
//     client.send(new Date().toTimeString());
//   });
// }, 1000)