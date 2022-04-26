const postEmail = `
  insert into email_utils 
    (email, email_send_code, email_code_validity_period) 
  values 
    ($1::varchar, $2::varchar, $3::timestamptz) returning *;
`

const postUser = `
  insert into users 
    (fullname, email_utils_id, image_url) 
  values 
    ($1, $2, $3) returning *;
`

const getEmail = `
  select 
    * 
  from email_utils 
  where
    email = $1 and
    case 
      when length($2) > 0 then email_send_code=$2
    else TRUE
    end and 
    now() < email_code_validity_period and 
    email_deleted_at is null;
`

const getUserFromEmail = `
  select 
    u.*, 
    e.email as email, 
    r.name as role 
  from users as u 
  left join email_utils as e on u.email_utils_id = e.id 
  left join roles as r on u.role_id = r.id 
  where 
    u.email_utils_id = $1
`


const deleteEmailFromTime = `
  update email_utils
  set 
    email_deleted_at = now()
  where 
    email = $1 or
    now() >= email_code_validity_period;
`

export default {
  postEmail,
  getEmail,
  getUserFromEmail,
  postUser,
  deleteEmailFromTime,
}
