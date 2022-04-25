import { fetchAll } from '../utils/postgres.js'


const model = (req, res, next) => {
	req.select = async function (table_name) {
		const data = await fetchAll(`select * from ${table_name};`)
		return data || []
	}

	return next()
}


export default model