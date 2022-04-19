import dotenv from 'dotenv'
import { host } from './src/utils/os.js'
dotenv.config()

const PORT = process.env.PORT || 4000
const TOKEN_TIME = 60 * 60 * 24
const image_mimetypes = ['jpg', 'jpeg', 'png', 'ief']
const email_code_period = 5   // minute
const email_regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export {
  PORT,
  host,
  TOKEN_TIME,
  image_mimetypes,
  email_code_period,
  email_regex,
}