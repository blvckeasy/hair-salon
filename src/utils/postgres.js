import pg from 'pg'

const pool = new pg.Pool({
	user: process.env.PG_USER,
	password: process.env.PG_PASSWORD,
	database: process.env.PG_DATABASE,
	port: process.env.PG_PORT,
	host: process.env.PG_HOST,
})

async function fetch (query, ...params) {
	const client = await pool.connect()
	try {
		const { rows: [ row ] } = await client.query(query, params.length ? params : null)
		return row
	} catch(error) {
		throw error
	} finally {
		client.release()
	}
}

async function fetchAll (query, ...params) {
	const client = await pool.connect()
	try {
		const { rows } = await client.query(query, params.length ? params : null)
		return rows
	} catch(error) {
		throw error
	} finally {
		client.release()
	}
}

export {
	fetchAll,
	fetch,
}