const SELECT_USER = `
  SELECT id, username, image_url, contact, contact_type_id, role_id, socket_id, user_created_at, user_updated_at, user_deleted_at FROM users WHERE username = $1 and password = $2
`

export {
  SELECT_USER
}