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
  var clientIpAddress = socket.request.headers['x-forwarded-for'] || socket.request.connection.remoteAddress;
  console.log(' new request from : '+clientIpAddress);
  socket.on('disconnect', () => console.log('Client disconnected'));
  io.emit('someone connected')
  socket.emit('you are connected')

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
