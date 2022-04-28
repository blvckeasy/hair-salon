import { verify } from '../utils/jwt.js'
import queries from '../../setup/queries.js'
import { fetchAll, fetch } from '../utils/postgres.js'

class Controller {
  async POST (req, res) {
    try {
      const { token } = req.body
      const { page = req.PAGINATION.page, limit = req.PAGINATION.limit } = req.query
      const { userId } = req.params
      const user = verify(token)
      if (user.error) throw new Error(user.error)

      console.log(page * limit - limit, limit * page)

      const data = await fetchAll(queries.getAllPost, userId || 0, limit * page, page * limit - limit )

      return res.json({
        message: "OK",
        data
      })
    } catch (error) {
      return res.json({
        error: error.message,
        data: []
      })
    }
  }
}



export default Controller