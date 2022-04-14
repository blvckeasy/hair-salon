import dotenv from 'dotenv'
import { host } from './src/utils/os.js'
dotenv.config()

const PORT = process.env.PORT || 4000
const TOKEN_TIME = 60 * 60 * 24

export {
  PORT,
  host,
  TOKEN_TIME,
}