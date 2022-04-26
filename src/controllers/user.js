class Controller {
  async GET (req, res) {
    try {
      const { userId } = req.params
		  const { page = req.PAGINATION.page, limit = req.PAGINATION.limit } = req.query
      console.log(page, limit)

      const users = await req.select('users')

      if(userId) {
        const user = users.find(user => user.id == userId)
        return res.json({
          data: user,
        })
      } else {
        const paginatedUsers = users.slice(page * limit - limit, limit * page)
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