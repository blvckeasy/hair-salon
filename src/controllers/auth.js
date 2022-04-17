import { sign, verify } from '../utils/jwt.js'
import { ADD_EMAIL } from '../../setup/queries.js'
import { fetch, fetchAll } from '../utils/postgres.js'
import { WriteFile } from '../utils/file.modul.js'
import { image_mimetypes } from '../../config.js'
import sendEmail from '../utils/email.modul.js'
import { addMinutes } from '../utils/time.js'

class Controller {
  async LOGIN (req, res) {
    try {
      const { fullname, email } = req.body
      
      

    } catch (err) {
      return res.json({
        error: err.message,
        data: {}
      })
    }
  }

  async REGISTER (req, res) {
    try {
      let { username, password, contact, contact_type_id } = req.body

      if (!username || !password || !contact || !contact_type_id) throw new Error('Enter the information correctly!')
      if (username.split('').inludes(' ')) throw new Error('')
      if (!image_mimetypes.includes(req.file.mimetype.split('/')[1])) throw new Error(`Only image upload. mimetypes: ${image_mimetypes.join(', ')}!`)
      if ((req.file.size / 1024 / 1024) > 10) throw new Error('the file size is too large!')

      username = username.trim()

      const file_name = await WriteFile(req.file)

      // const new_user = 

      console.log(req.file)
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
      const database_email = await fetch(ADD_EMAIL, email, random_number, addMinutes(5))
  
      const message = await sendEmail(email, 'Hair salon', `b>Your code:</b> <i>${random_number}</i>`)
      
      console.log(random_number)

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