create or replace database basket;

use basket;

create or replace table products (
	id bigint primary key auto_increment,
	name varchar(100) not null,
	onbasket boolean not null default false
);

insert into products (name) values
	('atún'),
	('pizza');


select *from products;