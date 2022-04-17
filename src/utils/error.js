import { appendFile } from 'fs/promises'
import { join } from 'path'

export default async function writeError(error) {
  await appendFile(join(process.cwd(), 'errors.log'), `${error.message}\n`)
}