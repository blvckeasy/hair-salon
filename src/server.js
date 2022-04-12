import { PORT, host } from '../config.js'
import userRouteClass from './routes/user.js'
import fastifyCors from 'fastify-cors'
import Fastify from 'fastify'

const fastify = Fastify()



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





fastify.listen(PORT, (err, address) => {
  if (err) throw err
  console.log(address.toString().replace('[::1]', host))
})
