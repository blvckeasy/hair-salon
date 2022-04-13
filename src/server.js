import userRouteClass from './routes/user.js'
import { PORT, host } from '../config.js'
import fastifyCors from 'fastify-cors'
import { Server } from 'socket.io'
import Fastify from 'fastify'
import http from 'http'
import { SocketController } from './controllers/user.js'

const fastify = Fastify()
const server = http.createServer(fastify)
const io = new Server(server, {
  cors: {
    origin: '*',
  },
})

fastify.register(fastifyCors, {
  origin: '*',
  methods: ['GET', 'POST', 'DELETE', 'PUT', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['X-Requested-With', 'content-type'],
  credentials: true,
})

// User Route
const userRoute = new userRouteClass()
const socketController = new SocketController()

fastify.register(userRoute.GET)
fastify.register(userRoute.POST)
fastify.register(userRoute.DELETE)
fastify.register(userRoute.PUT)



io.on('connection', function (socket) {
  // console.log(socket.handshake.auth)
  // console.log(socket.id)

  ;(function (token, socket_id) {
    console.log(token)
    console.log(socket_id)
  })(socket.handshake.auth.token, socket.id)
  
  // console.log(socket.query)
  // console.log(socket.body)

  // socket.on('users:id', (socket.id, token) => userRoute.UPDATE_SOCKET_ID)

  socket.on('disconnect', function () {
    console.log('<-- A user disconnected')
  })
})

server.listen(PORT, () =>
  console.log(`server is listening on http://${host}:${PORT}/`)
)
