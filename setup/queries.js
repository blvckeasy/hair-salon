const getLikePost = `
  select 
    * 
  from likes 
  where 
    user_id = $1 and 
    post_id = $2 and 
    like_deleted_at is null;
`

const getSavedPost = `
  select 
    * 
  from clouds 
  where 
    user_id = $1 and 
    post_id = $2 and 
    cloud_deleted_at is null;
`

const getUser = `
  select 
    * 
  from users 
  where
    case
      when $1 > 0 then id = $1
      else true
    end and
    user_deleted_at is null;
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

const getAllPost = `
  select 
    p.id,
    p.barber_id,
    p.image_url,
    p.bio,
    u.fullname as fullname,
    u.email_utils_id as email_utils_id,
    e.email as email,
    u.image_url as image_url,
    p.post_created_at
  from posts as p
  left join users as u 
  on 
    p.barber_id = u.id
  left join email_utils as e
  on
    u.email_utils_id = e.id
  where 
    p.post_deleted_at is null and 
    case
      when $1 <> 0 then p.barber_id = $1
      else true
    end
    order by p.post_created_at desc;
`

const getAllLikeUser = `
  select 
    * 
  from likes 
  where
    like_deleted_at is null and user_id = $1; 
`

const getAllSavedUser = `
  select 
    * 
  from clouds 
  where
    cloud_deleted_at is null and user_id = $1; 
`

const getAllPostUser = `
  select 
    *
  from posts
  where 
    post_deleted_at is null and barber_id = $1;
`

const getTableToday = `
  select 
    t.id as id,
    t.barber_id,
    t.client_id,
    u.email_utils_id,
    u.fullname as barber_name,
    us.fullname as client_name,
    t.comment,
    e.email,
    t.location,
    t.order_time,
    t.is_complated,
    at.name as approval_types
  from work_table as t
  left join users as u
  on 
    u.id = t.barber_id
  left join users as us
  on 
    us.id = t.client_id
  left join email_utils as e
  on 
    u.email_utils_id = e.id
  left join approval_types as at
  on
    at.id = t.approval_type
    where
    case
      when $1 > 0 then t.barber_id = $1
      else true
    end and
    'today'::timestamp < t.table_created_at and
    'tomorrow'::timestamp > t.table_created_at and
    t.table_deleted_at is null
  order by t.order_time asc;
`

const getAllPendings = `
  select 
    t.id as id,
    t.barber_id,
    t.client_id,
    u.email_utils_id,
    u.fullname as barber_name,
    us.fullname as client_name,
    t.comment,
    e.email,
    t.location,
    t.order_time,
    t.is_complated,
    at.name as approval_types
  from work_table as t
  left join users as u
  on 
    u.id = t.barber_id
  left join users as us
  on 
    us.id = t.client_id
  left join email_utils as e
  on 
    u.email_utils_id = e.id
  left join approval_types as at
  on
    at.id = t.approval_type
  where
    t.barber_id = $1 and
    t.approval_type = 2 and 
    t.table_deleted_at is null and 
    'today'::timestamp < t.table_created_at and
    'tomorrow'::timestamp > t.table_created_at;
`

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
    cloud_deleted_at = CURRENT_TIMESTAMP  
  where 
    user_id = $1 and post_id = $2 and cloud_deleted_at is null
  returning *;
`

const postSave = `
  insert into clouds (user_id, post_id) values ($1, $2) returning *;
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

const updateApprovalType = `
  update work_table 
  set 
    approval_type = $3,
    table_updated_at = CURRENT_TIMESTAMP
  where
    barber_id = $1 and 
    id = $2 and
    table_deleted_at is null
  returning *;
`



export default {
  getUser,
  getEmail,
  getAllPost,
  getLikePost,
  getSavedPost,
  getTableToday,
  getAllPostUser,
  getAllPendings,
  getAllLikeUser,
  getAllSavedUser,
  getUserFromEmail,
  postUser,
  postSave,
  postLike,
  postEmail,
  postUnSave,
  postDisLike,
  deleteEmailFromTime,
  updateEmailExists,
  updateApprovalType,
}
