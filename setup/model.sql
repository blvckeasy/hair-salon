create database hair_salon;

drop table if exists email_utils cascade;
create table if not exists email_utils (
  id smallserial primary key,
  email varchar(120) not null,
  email_send_code varchar(6),
  email_code_validity_period timestamp not null,
  email_created_at timestamp default now(),
  email_updated_at timestamp default now(),
  email_deleted_at timestamp default null
);

drop table if exists users cascade;
create table if not exists users (
  id smallserial primary key,
  fullname varchar(50) not null,
  email_utils_id int references email_utils(id) unique,
  image_url varchar default '/user.image.jpg',
  role_id int references roles(id) default 1,
  socket_id varchar(40),
  user_created_at timestamp default now(),
  user_updated_at timestamp default now(),
  user_deleted_at timestamp default null
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
  date_order_fulfillment timestamp not null,
  client_id int references users(id),
  barber_id int references users(id),
  is_complated boolean default false,
  is_canceled boolean default false,
  order_created_at timestamp default now(),
  order_updated_at timestamp default now(),
  order_deleted_at timestamp default null
);

drop table if exists messages cascade;
create table if not exists messages (
  id smallserial primary key,
  user_id int references users(id),
  to_user_id int references users(id),
  message_type varchar(25) not null,
  file_url varchar,
  message_created_at timestamp default now(),
  message_updated_at timestamp default now(),
  message_deleted_at timestamp default null
);

drop table if exists stars cascade;
create table if not exists stars (
  id smallserial primary key,
  client_id int references users(id),
  barber_id int references users(id),
  order_id int references orders(id),
  count smallint default 0,
  stars_created_at timestamp default now(),
  stars_updated_at timestamp default now(),
  stars_deleted_at timestamp default null
);

insert into roles (name) values ('client'), ('barber'), ('admin');

delete from users where fullname=fullname;
delete from email_utils where email=email;

insert into email_utils (email, email_send_code, email_code_validity_period) values 
  ('dharriss0@admin.ch', 13629, '2022-02-08 04:24:06'),
  ('kmoberley1@seattletimes.com', 63080, '2021-05-08 08:59:42'),
  ('cgoulstone2@tiny.cc', 80159, '2021-06-25 01:41:01'),
  ('gmiddleweek3@ehow.com', 68224, '2022-02-19 15:57:56'),
  ('dheffron4@google.com.br', 81800, '2022-01-17 03:05:37'),
  ('cferraro4@princeton.edu', 59195, '2021-12-25 20:57:23'),
  ('mjoselson1@blog.com', 65671, '2021-12-21 02:31:31'),
  ('amoine2@opensource.org', 68586, '2021-10-30 13:24:39'),
  ('camery3@about.com', 61987, '2021-07-22 17:02:41'),
  ('rshapiro4@wikimedia.org', 95852, '2021-06-20 12:03:38');


insert into users (fullname, email_utils_id, image_url, role_id) values 
  ('Silvio Jiricka', 1,'http://dummyimage.com/102x100.png/cc0000/ffffff', 3),
  ('Letty Biggs', 2, 'http://dummyimage.com/179x100.png/5fa2dd/ffffff', 2),
  ('Tracy Clubley', 3, 'http://dummyimage.com/225x100.png/dddddd/000000', 3),
  ('Sheila-kathryn Fassum', 4, 'http://dummyimage.com/122x100.png/dddddd/000000', 3),
  ('Trisha Mawby', 5, 'http://dummyimage.com/117x100.png/dddddd/000000', 3),
  ('Kyle Gero', 6, 'http://dummyimage.com/107x100.png/cc0000/ffffff', 2),
  ('Margot Kelling', 7, 'http://dummyimage.com/169x100.png/dddddd/000000', 3),
  ('Jsandye Corhard', 8, 'http://dummyimage.com/114x100.png/dddddd/000000', 1),
  ('Ferdinand Pottinger', 9, 'http://dummyimage.com/192x100.png/ff4444/ffffff', 2),
  ('Ambrosius Vigar', 10, 'http://dummyimage.com/121x100.png/5fa2dd/ffffff', 2);



select 
    * 
  from email_utils 
  where
  email = 'abdurakhmonovislom9@gmail.com' and
  case 
    when length('42432'::varchar) > 0 then email_send_code='42432'::varchar
    else TRUE
  end and 
  now() < email_code_validity_period and 
  email_deleted_at is null;