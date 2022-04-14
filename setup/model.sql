create database hair_salon;

drop table if exists users cascade;
create table if not exists users (
  id smallserial primary key,
  username varchar(40) not null unique,
  password varchar(20) not null,
  image_url text,
  contact varchar(100),
  contact_type_id int references contact_types(id) default 1,
  role_id int references roles(id) default 1,
  socket_id varchar(40),
  user_created_at timestamptz default now(),
  user_updated_at timestamptz default now(),
  user_deleted_at timestamptz default null
);

drop table if exists contact_types cascade;
create table if not exists contact_types (
  id smallserial primary key,
  name varchar(30) not null
);

drop table if exists roles cascade;
create table if not exists roles (
  id smallserial primary key,
  name varchar(30) not null
);

drop table if exists orders cascade;
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

drop table if exists messages cascade;
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

drop table if exists stars cascade;
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

insert into contact_types (name) values ('phone'), ('email');
insert into roles (name) values ('client'), ('barber'), ('admin');

insert into users (id, username, password, contact, contact_type_id, socket_id, role_id, user_created_at, user_updated_at) values 
  (1, 'Carlin', 'HdLFlNHPrsnC', '(770) 1868272', 1, '6257ccd5fc13ae3456000000', 1, '2022-02-02 21:23:35', '2022-03-16 10:21:45'),
  (2, 'Hanniei', 'CEhejHP20G', '(710) 5846731', 1, '6257ccd5fc13ae3456000001', 1, '2022-01-04 21:44:57', '2021-12-28 11:07:19'),
  (3, 'Blythe', 'QIwfHazHs5P', '(267) 7313023', 1, '6257ccd5fc13ae3456000002', 1, '2021-07-27 13:09:33', '2021-06-06 17:51:33'),
  (4, 'Elton', 'chEDZC', '(801) 9049642', 1, '6257ccd5fc13ae3456000003', 2, '2021-06-09 18:19:13', '2021-06-05 03:58:58'),
  (5, 'Kathy', '6R1dDX', '(662) 7283938', 1, '6257ccd5fc13ae3456000004', 2, '2022-03-07 23:30:04', '2022-02-21 05:29:28'),
  (6, 'Josiah', 'xB2yFc', '(671) 9860355', 1, '6257ccd5fc13ae3456000005', 1, '2022-02-07 01:28:00', '2021-11-26 03:13:06'),
  (7, 'Millie', 'F0BO5f', '(610) 7996552', 1, '6257ccd5fc13ae3456000006', 1, '2022-03-06 14:36:52', '2021-07-28 07:16:37'),
  (8, 'Templeton', 'SHEJfOOCz0tE', '(499) 6938612', 1, '6257ccd5fc13ae3456000007', 3, '2022-01-30 05:52:41', '2021-07-30 11:41:56'),
  (9, 'Axel', 's7AA4ZxHP', '(522) 5700738', 1, '6257ccd5fc13ae3456000008', 1, '2021-08-03 03:49:30', '2022-02-25 10:48:53'),
  (10, 'Davine', 'dsoHnu', '(154) 3767798', 1, '6257ccd5fc13ae3456000009', 2, '2022-02-02 18:18:19', '2022-04-06 14:06:13');