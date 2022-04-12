class Route {
  GET (fastify, opts, next) {
    fastify.get('/api/users', (request, reply) => {
      reply.send({ hello: 'method get' })
    })

    next()
  }

  POST (fastify, opts, next) {
    fastify.post('/api/users', (request, reply) => {
      reply.send({ hello: 'method post' })
    })

    next()
  }

  DELETE (fastify, opts, next) {
    fastify.delete('/api/users', (request, reply) => {
      reply.send({ hello: 'method delete' })
    })

    next()
  }

  PUT (fastify, opts, next) {
    fastify.put('/api/users', (request, reply) => {
      reply.send({ hello: 'method put' })
    })

    next()
  }
}


export default Route