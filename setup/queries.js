const ADD_EMAIL = `insert into email_utils (email, email_send_code, email_code_validity_period) values ($1::varchar, $2::int, $3::timestamptz) returning *;`
const FOUND_EMAIL_FROM_EMAIL_TABLE = `select * from email_utils where email=$1 and email_send_code=$2;` // and now() < email_code_validity_period
const FOUNT_USER_FROM_EMAIL = `select u.*, e.email as email, r.name as role from users as u left join email_utils as e on u.email_utils_id = e.id left join roles as r on u.role_id = r.id where u.email_utils_id = $1`
const INSERT_USER = `insert into users (fullname, email_utils_id, image_url) values ($1, $2, $3) returning *;`


export default {
  ADD_EMAIL,
  FOUND_EMAIL_FROM_EMAIL_TABLE,
  FOUNT_USER_FROM_EMAIL,
  INSERT_USER,
}
