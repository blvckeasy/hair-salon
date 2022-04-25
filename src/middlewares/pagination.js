import { PAGINATION } from '../../config.js'

export default (req, res, next) => {
	req.PAGINATION = PAGINATION
	return next()
}