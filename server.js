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
});

io.on('data', function(data) {
  console.log('data received', data);
})

setInterval(() => io.emit('time', new Date().toTimeString()), 1000);
