const postEmail = `
  insert into email_utils 
    (email, email_send_code) 
  values 
    ($1, $2) returning *;
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
    current_timestamp < email_code_validity_period and 
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
    email_deleted_at = current_timestamp
  where 
    email = $1 or
    current_timestamp >= email_code_validity_period;
`

const updateEmailExists = `
  update email_utils 
  set 
    email_send_code = $2,
    email_code_validity_period = CURRENT_TIMESTAMP + (interval '10 minute'), 
    email_updated_at = current_timestamp
  where 
    email = $1
  returning email_send_code;
`

const getAllPost = `
  select 
    p.id,
    p.barber_id,
    p.image_url,
    p.bio,
    u.fullname as fullname,
    u.email_utils_id as email_utils_id,
    u.image_url as image_url,
    p.post_created_at
  from posts as p
  left join users as u 
  on 
    p.barber_id = u.id
  where 
    p.post_deleted_at is null and 
    case
      when $1 <> 0 then p.barber_id = $1
      else true
    end
    order by p.id desc
  limit $2
  offset $3
`

const getLikePost = `
  select * from likes where user_id = $1 and post_id = $2 and like_delete_at is null;
`

const getSavedPost = `
  select * from clouds where user_id = $1 and post_id = $2 and cloud_delete_at is null;
`

const postDisLike = `
  update likes 
  set 
    like_deleted_at = CURRENT_TIMESTAMP  
  where 
    user_id = $1 and post_id = $2 and like_deleted_at is null
  returning *;
`

const postLike = `
  insert into likes (user_id, post_id) values ($1, $2) returning *;
`

const postUnSave = `
  update clouds 
  set 
    like_deleted_at = CURRENT_TIMESTAMP  
  where 
    user_id = $1 and post_id = $2 and like_deleted_at is null
  returning *;
`

const postSave = `
  insert into clouds (user_id, post_id) values ($1, $2) returning *;
`

export default {
  getEmail,
  getAllPost,
  getLikePost,
  getSavedPost,
  getUserFromEmail,
  postEmail,
  postUser,
  postDisLike,
  postLike,
  postUnSave,
  postSave,
  deleteEmailFromTime,
  updateEmailExists,
}
