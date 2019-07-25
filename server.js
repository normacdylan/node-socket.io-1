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

// 'use strict';

// const express = require('express');
// const SocketServer = require('ws').Server;
// const path = require('path');

// const PORT = process.env.PORT || 3000;
// const INDEX = path.join(__dirname, 'index.html');

// const server = express()
//   .use((req, res) => res.sendFile(INDEX) )
//   .listen(PORT, () => console.log(`Listening on ${ PORT }`));

// const wss = new SocketServer({ server });

// wss.on('connection', (ws) => {
//   console.log('Client connected');
//   ws.on('close', () => console.log('Client disconnected'));
// });

// wss.on()

// setInterval(() => {
//   wss.clients.forEach((client) => {
//     client.send(new Date().toTimeString());
//   });
// }, 1000);

var net = require('net');

const PORT = process.env.PORT || 3000;
// const HOST = 'https://powerful-garden-58783.herokuapp.com/';

var server = net.createServer(function(socket) {
  const id = socket.remoteAddress + ':' + socket.remotePort;
  const addressObject = socket.address();
  const {port, family, address} = addressObject;
  console.log('connection made with: ' + address + ' : ' + port)
	socket.write('Echo server\r\n');
  socket.pipe(socket);
  socket.on('data', function(data) {
    console.log('received data: ' + data.toString());
  })
  socket.on('end', function() {
    console.log('connection lost with: ' + address + ' : ' + port)
  })
  socket.on("error", (err) => console.log("Caught socket error: " + err.stack))
});
server.on('error', (err) => {
  console.log("Caught server error: " + err.stack)
});

server.listen(PORT);
console.log('Server listening to on ' + PORT);