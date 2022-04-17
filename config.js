import dotenv from 'dotenv'
import { host } from './src/utils/os.js'
dotenv.config()

const PORT = process.env.PORT || 4000
const TOKEN_TIME = 60 * 60 * 24
const image_mimetypes = ['jpg', 'jpeg', 'png', 'ief']
const email_code_period = 5   // minute

export {
  PORT,
  host,
  TOKEN_TIME,
  image_mimetypes,
  email_code_period,
}