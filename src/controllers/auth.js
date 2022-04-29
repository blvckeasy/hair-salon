import queries from '../../setup/queries.js'
import { fetch } from '../utils/postgres.js'
import { WriteFile } from '../utils/file.modul.js'
import { image_mimetypes } from '../../config.js'
import sendEmail from '../utils/email.modul.js'
import { sign } from '../utils/jwt.js'
import { email_regex } from '../../config.js'

class Controller {
  async LOGIN (req, res) {
    try {
      const { email, code } = req.body
      
      const found_email = await fetch(queries.getEmail, email, code.toString().padStart(5, '0'))
      if (!found_email) throw new Error('Password invalid!')
      
      const found_user = await fetch(queries.getUserFromEmail, found_email.id)
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
      const { fullname, email, code } = req.body
      const file = req.file
      const found_email = await fetch(queries.getEmail, email, code)
      let file_name = null

      if (!email.match(email_regex)) throw new Error('Invalid email !')
      if (!found_email) throw new Error('Email not found or password already outdated !')

      if (file) {
        if (!image_mimetypes.includes(file.mimetype.split('/')[1])) throw new Error(`Only img upload. Mimetypes: ${image_mimetypes.join(', ')}`)
        file_name = await WriteFile(file)
      }

      const user = await fetch(queries.postUser, fullname, found_email.id, file_name)
      const found_user = await fetch(queries.getUserFromEmail, user.email_utils_id)

      return res.json({
        message: "operation successfully ended.",
        data: found_user,
        token: sign(found_user)
      })
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
      const message = await sendEmail(email, 'Hair salon', `<b>Your code:</b> <i>${random_number}</i>`)
      
      const code = await fetch(queries.updateEmailExists, email, random_number)
      if (!code) {
        await fetch(queries.postEmail, email, random_number)
      }
      
      return res.json({
        message,
      })
    } catch (error) {
      return res.json({
        error: error.message,
      })
    }
  }
}


export default Controller