import { fetchAll, fetch } from '../utils/postgres.js'
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
      
      const users = await req.select('users')
      
      if(userId) {
        const posts = await fetchAll(queries.getAllPost, userId)
        const user = users.find(user => user.id == userId)

        return res.json({
          message: "ok",
          data: {
            user,
            posts
          },
        })
      } else {
        const paginatedUsers = users.slice(page * limit - limit, limit * page)
        const posts = await fetchAll(queries.getAllPost, null)
        const data = []

        for (const user of paginatedUsers) {
          const userPosts = []
          for (const post of posts) {
            if (user.id == post.barber_id) {
              post.is_liked = await fetch(queries.getLikePost, user.id, post.id) ? true : false
              post.is_saved = await fetch(queries.getSavedPost, user.id, post.id) ? true : false
              userPosts.push(post)
            }
          }
          data.push({
            user,
            posts: userPosts
          })
        }
        
        return res.json({
          message: "ok",
          data: data,
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