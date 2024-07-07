const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ["GET", "POST"],
  }
});

// const { ExpressPeerServer } = require('peer');


const port = process.env.PORT || 4000;

app.get('/', (req, res) => {
  res.send(
    '<div><h1>Video chat server</h1><img src="https://th-i.thgim.com/public/migration_catalog/article10549698.ece/alternates/FREE_1200/HYF01MAYABAZAAR1" style="width: 90vw" /></div>'
  );
});

// const peerServer = ExpressPeerServer(http, {
//   debug: true
// });

// app.use('/peerjs', peerServer); // PeerJS server




io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('JOIN_ROOM', (roomId, peerId, userName) => {
    console.log('JOIN ROOM ===> ', {peerId, userName,roomId});
    socket.join(roomId);

    socket.broadcast.to(roomId).emit('USER_CONNECTED',peerId,userName);
  })

  socket.on('TOGGLE_AUDIO', (roomId, peerId) => {
    console.log('TOGGLE AUDIO ===> ', {roomId, peerId});
    socket.join(roomId);
    socket.broadcast.to(roomId).emit('TOGGLE_AUDIO', peerId);
  });

  socket.on('TOGGLE_VIDEO', (roomId, peerId) => {
    console.log('TOGGLE VIDEO ===> ', {roomId, peerId});
    socket.join(roomId);
    socket.broadcast.to(roomId).emit('TOGGLE_VIDEO', peerId);
  });

  socket.on('CALL_END', (roomId, peerId) => {
    console.log('CALL END ===> ', {roomId, peerId});
    socket.join(roomId);
    socket.broadcast.to(roomId).emit('CALL_END', peerId);
  })
});

http.listen(port, () => {
  console.log('listening on: ' + port);
});
