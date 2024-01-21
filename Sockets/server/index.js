import express from 'express'
import logger from 'morgan'

import { Server } from 'socket.io'
import { createServer } from 'node:http'

const port = process.env.PORT ?? 3000

const app = express()
const server = createServer(app)
const io = new Server(server, {
  connectionStateRecovery: {}
})

io.on('connection', (socket) => {
  console.log('A user has connected to Azen <3 .   :D ')

  socket.on('disconnect', () => {
    console.log(' A user has disconnected to Azen </3 . :( ')
  })

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg)
  })
})

app.use(logger('dev'))

app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/client/index.html')
//  res.send('<h1> Azen - Chat using Sockets.io </h1>')
})

server.listen(port, () => {
  console.log(`Server AZEN running on port ${port}`)
})
