CREATE DATABASE todos

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    user_email varchar(255),
    user_password varchar(255)
)

CREATE TABLE todo (
    todo_id SERIAL PRIMARY KEY,
    tasks varchar(255),
    due_date date,
    task_priority varchar(30),
    user_id int,
	FOREIGN KEY (user_id) REFERENCES users(user_id)
)