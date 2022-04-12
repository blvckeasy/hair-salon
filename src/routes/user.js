import Controller from '../controllers/user.js'

const controller = new Controller()

class Route {
  GET (fastify, opts, next) {
    fastify.get('/api/users', controller.GET)

    next()
  }

  POST (fastify, opts, next) {
    fastify.post('/api/users', (request, reply) => controller.POST)

    next()
  }

  DELETE (fastify, opts, next) {
    fastify.delete('/api/users', (request, reply) => controller.DELETE)

    next()
  }

  PUT (fastify, opts, next) {
    fastify.put('/api/users', (request, reply) => controller.PUT)

    next()
  }
}


export default Route