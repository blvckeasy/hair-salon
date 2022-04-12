import dotenv from 'dotenv'
import { host } from './src/utils/os.js'
dotenv.config()

const PORT = process.env.PORT || 4000

export {
  PORT,
  host,
}