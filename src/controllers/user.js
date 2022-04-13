class Controller {
  GET (request, reply) {
    
    reply.send({ hello: 'get' })
  }

  POST (request, reply) {
    reply.send({ hello: 'method post' })
  }

  DELETE (request, reply) {
    reply.send({ hello: 'method delete' })  
  }

  
  
}

class SocketController {
  PUT (request, reply) {
    reply.send({ hello: 'method put' })
  }
}

export {
  Controller,
  SocketController
}