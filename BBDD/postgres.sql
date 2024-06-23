create database basket;

\c basket

create table products (
	id serial primary key,
	name varchar(100) not null,
	onbasket boolean not null default false
);

insert into products (name) values
	('arroz'),
	('lentejas');

select *from products;
