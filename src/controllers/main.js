import { verify } from '../utils/jwt.js'

class Controller {
  async POST (req, res) {
    try {
      const { token } = req.body
      const verifyUser = verify(token)
      if (verifyUser.error) throw new Error(verifyUser.error)

      console.log(verifyUser)

    } catch (error) {
      return res.json({
        error: error.message,
        data: []
      })
    }
  }
}



export default Controller