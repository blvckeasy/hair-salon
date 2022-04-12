create database hair_salon;

create table if not exists users (
  id serial not null primary key,
  fullname varchar(40) not null unique,
  contact varchar(12),
   
);