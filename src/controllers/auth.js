import queries from '../../setup/queries.js'
import { fetch, fetchAll } from '../utils/postgres.js'
import { WriteFile } from '../utils/file.modul.js'
import { image_mimetypes } from '../../config.js'
import sendEmail from '../utils/email.modul.js'
import { sign, verify } from '../utils/jwt.js'
import { addMinutes } from '../utils/time.js'
import { email_regex } from '../../config.js'

class Controller {
  async LOGIN (req, res) {
    try {
      const { email, code } = req.body
      
      const found_email = await fetch(queries.FOUND_EMAIL_FROM_EMAIL_TABLE, email, code)
      if (!found_email) throw new Error('Password invalid!')
      
      const found_user = await fetch(queries.FOUNT_USER_FROM_EMAIL, found_email.id)
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
      const found_email = await fetch(queries.FOUND_EMAIL_FROM_EMAIL_TABLE, email, code)
      
      if (!email.match(email_regex)) throw new Error('Invalid email !')
      if (!found_email) throw new Error('Email not found or password already outdated !')

    

      const new_user = {
        fullname,
        email_utils_id: found_email.id,
        img_url: null
      }


      console.log(file)

      // console.log(file)
      // console.log(email)
      // console.log(fullname)

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

      await fetch(queries.ADD_EMAIL, email, random_number, addMinutes(10))

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