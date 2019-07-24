'use strict';

const express = require('express');
const socketIO = require('socket.io');
const path = require('path');

// const app = express();

const PORT = process.env.PORT || 3000;
const INDEX = path.join(__dirname, 'index.html');

const server = express()
  .use((req, res) => res.sendFile(INDEX) )
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

const io = socketIO(server);

// app.get('/', function (req, res) {
//   res.send('<h1>Hello</h1>')
// });

io.on('connection', (socket) => {
  console.log('Client connected');
  socket.on('disconnect', () => console.log('Client disconnected'));
  io.emit('someone connected')
  socket.emit('you are connected')
  io.emit('msg', `${socket.toString()} joined`)
});

io.on('data', function(data) {
  io.emit('msg', data);
})

io.on("*", function(input) {
  io.emit('msg', input.toString())
})

// io.on('data', function(data) {
//   console.log('data received', data);
// })

// setInterval(() => io.emit('time', new Date().toTimeString()), 1000);

