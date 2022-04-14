import { TOKEN_TIME } from '../../config.js'
import jwt from 'jsonwebtoken'

export default {
	sign: (payload) => {
		try {
			return jwt.sign(payload, process.env.TOKEN_KEY, { expiresIn: TOKEN_TIME })
		} catch(error) {
			console.log(error.message)
		}
	},
	verify: (token) => {
		try {
			return jwt.verify(token, process.env.TOKEN_KEY)
		} catch(error) {
			return {
        error: 'invalid token'
      }
		}
	}
}