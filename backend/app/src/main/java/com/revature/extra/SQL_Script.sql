
--generate user table
create table if not exists users (
	user_id int primary key generated always as identity,
	username varchar(30) unique not null,
	firstName varchar(128) not null,
	lastName varchar(164),
	email varchar(128) unique not null,
	password varchar(256) not null,
	role_id int references user_roles(role_id) not null
);

drop table users cascade;

--generate user role lookup table
create table if not exists user_roles (
	role_id int unique not null,
	role varchar(20) unique not null
);

drop table user_roles cascade;


--populate user_roles table
insert into user_roles(role_id, role) values (1, 'FinanceManager');
insert into user_roles(role_id, role) values (2, 'Employee');



--generate reimbursement table
create table if not exists reimbursements(
	reimbursement_id int primary key generated always as identity,
	amount decimal,
	submitted_date date not null,
	resolved_date date,
	reimbursement_author int references users(user_id) on delete cascade not null,
	reimbursement_resolver int references users(user_id) on delete cascade  not null,
	reimbursement_status_id int references reimbursement_status(status_id) not null,
	reimbursement_type_id int references reimbursement_type(type_id) not null
	);

drop table reimbursements cascade;


--generate reimbursement status lookup table
create table if not exists reimbursement_status(
	status_id int unique not null,
	status varchar(20)
);

drop table reimbursement_status cascade;


--generate reimbursement type lookup table
create table if not exists reimbursement_type(
	type_id int unique not null,
	reimbursement_type varchar(20)
);
drop table reimbursement_type cascade;

insert into reimbursement_type(type_id, reimbursement_type) values (1, 'LODGING');
insert into reimbursement_type(type_id, reimbursement_type) values (2, 'TRAVEL');
insert into reimbursement_type(type_id, reimbursement_type) values (3, 'FOOD');
insert into reimbursement_type(type_id, reimbursement_type) values (4, 'OTHER');


-- example return user by username OR email
SELECT * from users where username = 'jj_link' or email = 'joseph@revature.com';


)
