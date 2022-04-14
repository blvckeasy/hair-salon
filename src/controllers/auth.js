import { sign, verify } from '../utils/jwt.js'
import { SELECT_USER } from '../../setup/queries.js'
import { fetch, fetchAll } from '../utils/postgres.js'

class Controller {
  async LOGIN (req, res) {
    try {
      const { username, password } = req.body
      if (!username || !password) throw new Error('username and password require !')      
      const user = await fetch(SELECT_USER, username, password)

      res.json({
        status: 201,
        data: user || {},
        token: sign(user)
      })
      
    } catch (err) {
      return res.json({
        error: err.message,
        data: {}
      })
    }
  }

  async REGISTER (req, res) {
    
  }
}


export default Controller