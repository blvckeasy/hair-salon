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
  image_url varchar not null default '/user.image.jpg',
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

drop table if exists posts cascade;
create table if not exists posts (
  id smallserial primary key,
  barber_id int references users(id),
  image_url varchar not null,
  like_count int not null default 0,
  bio varchar(250) not null default '',
  post_created_at timestamp default CURRENT_TIMESTAMP,
  post_updated_at timestamp default CURRENT_TIMESTAMP,
  post_deleted_at timestamp default null
);

drop table if exists clouds cascade;
create table if not exists clouds (
  id smallserial primary key,
  user_id int references users(id),
  post_id int references posts(id),
  cloud_created_at timestamp default CURRENT_TIMESTAMP,
  cloud_updated_at timestamp default CURRENT_TIMESTAMP,
  cloud_deleted_at timestamp default null
);





-- insert data

insert into roles (name) values ('client'), ('barber'), ('admin');

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

  
insert into posts (id, barber_id, image_url, like_count, bio) values 
  (1, 4, 'http://dummyimage.com/207x100.png/5fa2dd/ffffff', 82, 'Decentralized client-driven knowledge base'),
  (2, 10, 'http://dummyimage.com/167x100.png/5fa2dd/ffffff', 46, 'Enterprise-wide disintermediate local area network'),
  (3, 7, 'http://dummyimage.com/222x100.png/5fa2dd/ffffff', 48, 'Robust mission-critical circuit'),
  (4, 8, 'http://dummyimage.com/197x100.png/5fa2dd/ffffff', 24, 'User-friendly user-facing data-warehouse'),
  (5, 6, 'http://dummyimage.com/111x100.png/5fa2dd/ffffff', 10, 'Devolved bifurcated standardization'),
  (6, 1, 'http://dummyimage.com/128x100.png/5fa2dd/ffffff', 80, 'Expanded demand-driven policy'),
  (7, 8, 'http://dummyimage.com/243x100.png/ff4444/ffffff', 32, 'User-centric coherent website'),
  (8, 10, 'http://dummyimage.com/174x100.png/cc0000/ffffff', 13, 'Synergized transitional application'),
  (9, 8, 'http://dummyimage.com/131x100.png/dddddd/000000', 51, 'Digitized incremental alliance'),
  (10, 3, 'http://dummyimage.com/226x100.png/5fa2dd/ffffff', 61, 'Open-source uniform portal'),
  (11, 9, 'http://dummyimage.com/248x100.png/dddddd/000000', 40, 'Configurable object-oriented model'),
  (12, 1, 'http://dummyimage.com/104x100.png/5fa2dd/ffffff', 47, 'Persistent bifurcated contingency'),
  (13, 4, 'http://dummyimage.com/131x100.png/5fa2dd/ffffff', 40, 'Centralized even-keeled migration'),
  (14, 7, 'http://dummyimage.com/207x100.png/dddddd/000000', 44, 'Networked cohesive capability'),
  (15, 2, 'http://dummyimage.com/111x100.png/5fa2dd/ffffff', 81, 'Cross-group stable pricing structure'),
  (16, 9, 'http://dummyimage.com/171x100.png/ff4444/ffffff', 76, 'Networked zero administration success'),
  (17, 8, 'http://dummyimage.com/173x100.png/ff4444/ffffff', 31, 'Decentralized needs-based capacity'),
  (18, 10, 'http://dummyimage.com/124x100.png/dddddd/000000', 62, 'Virtual demand-driven functionalities'),
  (19, 6, 'http://dummyimage.com/160x100.png/dddddd/000000', 5, 'Digitized regional approach'),
  (20, 10, 'http://dummyimage.com/226x100.png/dddddd/000000', 87, 'Digitized coherent structure'),
  (21, 10, 'http://dummyimage.com/138x100.png/5fa2dd/ffffff', 17, 'Open-source national framework'),
  (22, 6, 'http://dummyimage.com/200x100.png/dddddd/000000', 48, 'Self-enabling context-sensitive application'),
  (23, 1, 'http://dummyimage.com/216x100.png/ff4444/ffffff', 10, 'Switchable responsive flexibility'),
  (24, 3, 'http://dummyimage.com/204x100.png/ff4444/ffffff', 64, 'Fundamental demand-driven internet solution'),
  (25, 10, 'http://dummyimage.com/232x100.png/dddddd/000000', 83, 'Exclusive transitional knowledge user'),
  (26, 8, 'http://dummyimage.com/178x100.png/dddddd/000000', 31, 'Programmable systematic complexity'),
  (27, 6, 'http://dummyimage.com/111x100.png/5fa2dd/ffffff', 49, 'Realigned heuristic matrices'),
  (28, 1, 'http://dummyimage.com/110x100.png/5fa2dd/ffffff', 44, 'Enhanced encompassing application'),
  (29, 3, 'http://dummyimage.com/219x100.png/ff4444/ffffff', 90, 'Distributed tertiary customer loyalty'),
  (30, 5, 'http://dummyimage.com/206x100.png/ff4444/ffffff', 46, 'Horizontal background forecast'),
  (31, 4, 'http://dummyimage.com/160x100.png/ff4444/ffffff', 42, 'Fundamental mobile matrices'),
  (32, 10, 'http://dummyimage.com/104x100.png/ff4444/ffffff', 59, 'Total eco-centric ability'),
  (33, 3, 'http://dummyimage.com/196x100.png/ff4444/ffffff', 19, 'Face to face web-enabled intranet'),
  (34, 3, 'http://dummyimage.com/117x100.png/cc0000/ffffff', 98, 'Intuitive empowering open system'),
  (35, 3, 'http://dummyimage.com/123x100.png/ff4444/ffffff', 5, 'Optional explicit time-frame'),
  (36, 9, 'http://dummyimage.com/112x100.png/5fa2dd/ffffff', 85, 'Team-oriented regional info-mediaries'),
  (37, 5, 'http://dummyimage.com/191x100.png/dddddd/000000', 40, 'Reduced intermediate installation'),
  (38, 6, 'http://dummyimage.com/190x100.png/ff4444/ffffff', 43, 'Compatible heuristic emulation'),
  (39, 9, 'http://dummyimage.com/164x100.png/5fa2dd/ffffff', 100, 'Multi-tiered explicit hub'),
  (40, 7, 'http://dummyimage.com/216x100.png/ff4444/ffffff', 69, 'Up-sized impactful hub');




-- selects

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



select case
  when (NULL is not null) then true
  else FALSE
end;


select 
    p.*,
    u.id as user_id,
    u.fullname as fullname,
    u.email_utils_id as email_utils_id,
    u.image_url as image_url
  from posts as p
  left join users as u 
  on 
    p.barber_id = u.id
  where 
    p.post_deleted_at is null and 
    case
      when 0 <> 0 then p.barber_id = 0
      else true
    end
  order by p.like_count desc
  limit 1
  offset 5;