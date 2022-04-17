const SELECT_USER = `
  
`

const ADD_EMAIL = `insert into email_utils (email, email_send_code, email_code_validity_period) values ($1::varchar, $2::int, $3::timestamptz) returning *;`


export {
  SELECT_USER,
  ADD_EMAIL
}