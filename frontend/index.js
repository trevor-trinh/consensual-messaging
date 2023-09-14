const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server)

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

io.on('connection', (socket) => {
  console.log('a user connected')
  socket.on('start-session', function (data) {
    console.log(data)
    if (data.sessionId == null) {
      var session_id = uuidv4() // creates a unique identifier
      socket.room = session_id
      socket.join(socket.room, function (res) {
        console.log('session id: ' + session_id)
        socket.emit('set-session-acknowledgement', { sessionId: session_id })
      })
    } else {
      socket.room = data.sessionId // using the same session
      socket.join(socket.room, function (res) {
        socket.emit('set-session-acknowledgement', {
          sessionId: data.sessionId,
        })
      })
    }
  })

  socket.on('chat message', (msg) => {
    console.log('message: ' + msg)
  })
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg)
  })
  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})

server.listen(3000, () => {
  console.log('listening on *:3000')
})
