import userRouteClass from './routes/user.js'
import { PORT, host } from '../config.js'
import fastifyCors from 'fastify-cors'
import Fastify from 'fastify'


const fastify = Fastify()

fastify.register(fastifyCors, {
  origin: '*',
  methods: ['GET', 'POST', 'DELETE', 'PUT', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['X-Requested-With', 'content-type'],
  credentials: true,
})

// User Route
const userRoute = new userRouteClass()

fastify.register(userRoute.GET)
fastify.register(userRoute.POST)
fastify.register(userRoute.DELETE)
fastify.register(userRoute.PUT)


fastify.listen(PORT, () =>
  console.log(`server is listening on http://${host}:${PORT}/api/`)
)