create database hair_salon;

create table if not exists users (
  id smallserial primary key,
  fullname varchar(40) not null unique,
  password varchar(20) not null,
  contact varchar(100),
  contact_type varchar(30) not null,
  role varchar(30) default 'client',
  socket_id varchar(20),
  user_created_at timestamptz default now(),
  user_updated_at timestamptz default now(),
  user_deleted_at timestamptz default null
);

create table if not exists orders (
  id smallserial primary key,
  comment varchar(200) not null,
  date_order_fulfillment timestamptz not null,
  client_id int references users(id),
  barber_id int references users(id),
  is_complated boolean default false,
  order_created_at timestamptz default now(),
  order_updated_at timestamptz default now(),
  order_deleted_at timestamptz default null
);

create table if not exists messages (
  id smallserial primary key,
  user_id int references users(id),
  to_user_id int references users(id),
  message_type varchar(25) not null,
  file_url text,
  message_created_at timestamptz default now(),
  message_updated_at timestamptz default now(),
  message_deleted_at timestamptz default null
);

create table if not exists stars (
  id smallserial primary key,
  client_id int references users(id),
  barber_id int references users(id),
  order_id int references orders(id),
  count smallint default 0,
  message_created_at timestamptz default now(),
  message_updated_at timestamptz default now(),
  message_deleted_at timestamptz default null
);