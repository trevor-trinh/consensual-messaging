const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3000',
  },
})
// const io = new Server(server)

// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index.html')
// })

// io.use(async (socket, next) => {
//   const sessionID = socket.handshake.auth.sessionID
//   if (sessionID) {
//     const session = await sessionStore.findSession(sessionID)
//     if (session) {
//       socket.username = session.username
//       return next()
//     }
//   }
//   const username = socket.handshake.auth.username
//   if (!username) {
//     return next(new Error('invalid username'))
//   }
//   socket.sessionID = randomId()
//   socket.userID = randomId()
//   socket.username = username
//   next()
// })

io.on('connection', (socket) => {
  console.log('a user connected')

  socket.on('chat message', (msg) => {
    console.log('message: ' + msg)
  })
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg)
  })

  // fetch existing users
  const users = []
  // socket.emit('users', users)

  // notify existing users
  socket.broadcast.emit('user connected', {
    username: socket.username,
    connected: true,
  })

  socket.on('create', function (name, address, room, callback) {
    console.log(`called with arguments ${name} ${address} ${room}`)
    users.push({ name, address })
    socket.join(room)
    callback()
  })

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})

server.listen(3001, () => {
  console.log('listening on *:3001')
})
