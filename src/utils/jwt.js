import { TOKEN_TIME } from '../../config.js'
import jwt from 'jsonwebtoken'

function sign (payload) {
	try {
		return jwt.sign(payload, process.env.TOKEN_KEY, { expiresIn: TOKEN_TIME })
	} catch(error) {
		console.log(error.message)
	}
}

function verify (token) {
	try {
		return jwt.verify(token, process.env.TOKEN_KEY)
	} catch(error) {
		return {
			error: 'invalid token'
		}
	}
}

export {
	sign,
	verify
}