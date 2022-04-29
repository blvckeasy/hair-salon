import { fetch, fetchAll } from '../utils/postgres.js'
import queries from '../../setup/queries.js'
import { verify } from '../utils/jwt.js'

class Controller {
  async GET (req, res) {
    try {
		  const { page = req.PAGINATION.page, limit = req.PAGINATION.limit } = req.query
      const { userId } = req.params
      const { token } = req.body

      
      const activeUser = verify(token)
      if (activeUser.error) throw new Error('Invalid token')
      
      

      let users = await req.select('users')

      if(userId) {
        const posts = await fetchAll(queries.getAllPost, userId, limit * page, page * limit - limit)
        const user = users.find(user => user.id == userId)
        user['posts'] = posts

        return res.json({
          data: user,
        })
      } else {
        const paginatedUsers = users.slice(page * limit - limit, limit * page)
        const posts = await fetchAll(queries.getAllPost, userId, limit * page, page * limit - limit)
        
        for (let user of paginatedUsers) {
          user['posts'] = []
          for (let post of posts) {
            if (user.id == post.barber_id) {
              user['posts'].push(post)
            }
          }
        }
        
        return res.json({
          data: paginatedUsers,
        })
      }

    } catch (error) {
      return res.json({
        error: error.message,
        data: []
      })
    }
  }
}



export default Controller