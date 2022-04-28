create database hair_salon;

drop table if exists email_utils cascade;
create table if not exists email_utils (
  id smallserial primary key,
  email varchar(120) not null unique,
  email_send_code varchar(6),
  email_code_validity_period timestamp default CURRENT_TIMESTAMP + (interval '10 minute'),
  email_created_at timestamp default CURRENT_TIMESTAMP,
  email_updated_at timestamp default CURRENT_TIMESTAMP,
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
  user_created_at timestamp default CURRENT_TIMESTAMP,
  user_updated_at timestamp default CURRENT_TIMESTAMP,
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
  order_created_at timestamp default CURRENT_TIMESTAMP,
  order_updated_at timestamp default CURRENT_TIMESTAMP,
  order_deleted_at timestamp default null
);

drop table if exists messages cascade;
create table if not exists messages (
  id smallserial primary key,
  user_id int references users(id),
  to_user_id int references users(id),
  message_type varchar(25) not null,
  file_url varchar,
  message_created_at timestamp default CURRENT_TIMESTAMP,
  message_updated_at timestamp default CURRENT_TIMESTAMP,
  message_deleted_at timestamp default null
);

drop table if exists stars cascade;
create table if not exists stars (
  id smallserial primary key,
  client_id int references users(id),
  barber_id int references users(id),
  order_id int references orders(id),
  count smallint default 0,
  stars_created_at timestamp default CURRENT_TIMESTAMP,
  stars_updated_at timestamp default CURRENT_TIMESTAMP,
  stars_deleted_at timestamp default null
);

insert into roles (name) values ('client'), ('barber'), ('admin');

delete from users where fullname=fullname;
delete from email_utils where email=email;

insert into email_utils (email, email_send_code) values 
  ('dharriss0@admin.ch', 13629),
  ('kmoberley1@seattletimes.com', 63080),
  ('cgoulstone2@tiny.cc', 80159),
  ('gmiddleweek3@ehow.com', 68224),
  ('dheffron4@google.com.br', 81800),
  ('cferraro4@princeton.edu', 59195),
  ('mjoselson1@blog.com', 65671),
  ('amoine2@opensource.org', 68586),
  ('camery3@about.com', 61987),
  ('rshapiro4@wikimedia.org', 95852);


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
  CURRENT_TIMESTAMP < email_code_validity_period and 
  email_deleted_at is null


select 
    * 
  from email_utils 
  where
    email = 'abdurakhmonovislom9@gmail.com' and
    case 
      when length('29757') > 0 then email_send_code='29757'
    else TRUE
    end and 
    CURRENT_TIMESTAMP < email_code_validity_period::timestamp and 
    email_deleted_at is null;