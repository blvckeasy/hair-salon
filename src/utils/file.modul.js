import { writeFile } from 'fs/promises'
import { join } from 'path'


export const WriteFile = async ({ buffer, originalname }) => {
  try {
    const file_name = Date.now() + originalname.replace(/\s/g, '_')
    const file_path = join(process.cwd(), 'src', 'public', file_name)

    await writeFile(file_path, buffer)

    return file_name
  } catch (error) {
    return error
  }
}