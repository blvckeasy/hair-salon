import { sign, verify } from '../utils/jwt.js'
import { ADD_EMAIL, FOUND_EMAIL, FOUNT_USER_FROM_EMAIL } from '../../setup/queries.js'
import { fetch, fetchAll } from '../utils/postgres.js'
import { WriteFile } from '../utils/file.modul.js'
import { image_mimetypes } from '../../config.js'
import sendEmail from '../utils/email.modul.js'
import { addMinutes } from '../utils/time.js'

class Controller {
  async LOGIN (req, res) {
    try {
      const { email, code } = req.body
      
      const found_email = await fetch(FOUND_EMAIL, email, code)
      if (!found_email) throw new Error('Password invalid!')
      
      const found_user = await fetch(FOUNT_USER_FROM_EMAIL, found_email.id)
      if (!found_user) throw new Error('User not defined!')

      return res.json({
        message: "welcome hair salon web site ;)",
        data: found_user,
        token: sign(found_user)
      })
    } catch (err) {
      return res.json({
        message: "Maybe you will try from the beginning :(",
        error: err.message,
        data: {},
      })
    }
  }

  async REGISTER (req, res) {
    try {
      
    } catch (error) {
      return res.json({
        error: error.message,
        data: {}
      })
    }
  }

  async EMAIL (req, res) {
    try {
      const { email } = req.body
      const random_number = String(parseInt(Math.random() * 100000)).padStart(5, 0)
      const message = await sendEmail(email, 'Hair salon', `b>Your code:</b> <i>${random_number}</i>`)
      
      await fetch(ADD_EMAIL, email, random_number, addMinutes(5))

      return res.json({
        message,
      })
    } catch (error) {
      return res.json({
        error: error?.detail,
      })
    }
  }
}


export default Controller