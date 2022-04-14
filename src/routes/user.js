import Controller from '../controllers/user.js'

const controller = new Controller()

class Route {
  GET (fastify, opts, next) {
    fastify.get('/api/users', controller.GET)

    next()
  }

  POST (fastify, opts, next) {
    fastify.post('/api/users', controller.POST)
    fastify.post('/api/login', controller.LOGIN)
    fastify.post('/api/register', controller.REGISTER)
    next()
  }

  DELETE (fastify, opts, next) {
    fastify.delete('/api/users', controller.DELETE)

    next()
  }

  PUT (fastify, opts, next) {
    fastify.put('/api/users', controller.PUT)

    next()
  }

}


export default Route