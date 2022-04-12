import userRouteClass from './routes/user.js'
import { PORT, host } from '../config.js'
import fastifyCors from 'fastify-cors'
import http from 'http'
import Fastify from 'fastify'
import { Server } from "socket.io";

const fastify = Fastify()
const io = new Server(http.Server(fastify))

fastify.register(fastifyCors, {
  origin: '*',
  methods: ['GET', 'POST', 'DELETE', 'PUT', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['X-Requested-With', 'content-type'],
  credentials: true
})


// User Route 
const userRoute = new userRouteClass()

fastify.register(userRoute.GET)
fastify.register(userRoute.POST)
fastify.register(userRoute.DELETE)
fastify.register(userRoute.PUT)


//Whenever someone connects this gets executed
io.on('connection', function(socket) {
  console.log('A user connected');

  //Whenever someone disconnects this piece of code executed
  socket.on('disconnect', function () {
     console.log('A user disconnected');
  });
});


fastify.listen(PORT, (err, address) => {
  if (err) throw err
  console.log(address.toString().replace('[::1]', host) + '/api/')
})
