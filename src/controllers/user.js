import { fetch, fetchAll } from '../utils/postgres.js'

class Controller {
  async GET (request, reply) {
    
    reply.send({ hello: 'get' })
  }

  async POST (request, reply) {
    reply.send({ hello: 'method post' })
  }

  async DELETE (request, reply) {
    reply.send({ hello: 'method delete' })  
  }

  async PUT (request, reply) {
    reply.send({ hello: 'method put' })
  }
  
  async LOGIN (request, reply) {
    try {
      const user = await fetch(`select now()`)
      console.log(user)
    } catch (err) {
      return reply.send({
        error: err.message,
        data: {}
      })
    }
  }

  REGISTER (request, reply) {
    //
  }

}

// class SocketController {
//   PUT (request, reply) {
//     reply.send({ hello: 'method put' })
//   }
// }

export default Controller