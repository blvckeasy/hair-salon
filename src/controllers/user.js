import { fetch, fetchAll } from '../utils/postgres.js'

class Controller {
  async GET (req, res) {
    try {
      console.log(req.params)
    } catch (error) {
      return res.json({})
    }
  }
}

export default Controller