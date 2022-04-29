import { verify } from '../utils/jwt.js'
import queries from '../../setup/queries.js'
import { fetchAll, fetch } from '../utils/postgres.js'

class Controller {
  async POST (req, res) {
    try {
      const { page = req.PAGINATION.page, limit = req.PAGINATION.limit } = req.query
      const { userId } = req.params
      const { token } = req.body
      const user = verify(token)

      if (user.error) throw new Error(user.error)
    
      const posts = await fetchAll(queries.getAllPost, userId || 0)
      const paginatedPosts = posts.slice(page * limit - limit, limit * page)
      
      for (const post of paginatedPosts) {
        post.is_liked = await fetch(queries.getLikePost, user.id, post.id) ? true : false
        post.is_saved = await fetch(queries.getSavedPost, user.id, post.id) ? true : false
      }
      
      return res.json({
        message: "ok",
        data : paginatedPosts
      })
    } catch (error) {
      return res.json({
        error: error.message,
        data: []
      })
    }
  }

  async LIKE (req, res) {
    try {
      const { token } = req.body
      const { postId } = req.params
      const user = verify(token)
      
      if (user.error) throw new Error(user.error)
      if (!postId) throw new Error('postId is require!')

      let like = await fetch(queries.postDisLike, user.id, postId)
      if (!like) {
        like = await fetch(queries.postLike, user.id, postId)
      }

      return res.json({
        message: "ok",
        data: like
      })
    } catch (error) {
      return res.json({
        error: error.message,
        data: []
      })
    }
  }

  async SAVE (req, res) {
    try {
      const { token } = req.body
      const { postId } = req.params
      const user = verify(token)
      
      if (user.error) throw new Error(user.error)
      if (!postId) throw new Error('postId is require!')

      let save = await fetch(queries.postUnSave, user.id, postId)
      if (!save) {
        save = await fetch(queries.postSave, user.id, postId)
      }

      return res.json({
        message: "ok",
        data: save
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