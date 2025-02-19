DROP DATABASE if  exists alt_db;
CREATE DATABASE if not exists alt_db;
USE alt_db;
-- Usuarios
CREATE TABLE IF NOT EXISTS alt_users (
  id CHAR(36) PRIMARY KEY, -- Use UUIDs as 36-character strings
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password varchar(255) not null,
  role varchar(100) not null DEFAULT("employee"),
  created_at datetime default(now())
);

select * from alt_db.alt_users;
-- Emails permitidos
CREATE TABLE IF NOT EXISTS emails (
	id CHAR(36) PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    created_at datetime default(now())
);


-- Tareas
CREATE TABLE IF NOT EXISTS alt_tasks(
	id CHAR(36) PRIMARY KEY,
    company VARCHAR(255) NOT NULL,
    project VARCHAR(255) NOT NULL,
    task_type VARCHAR(255) NOT NULL,
    task_description varchar(255),
    entry_time time,
    exit_time time,
    hour_type varchar(100),
    lunch_hours float,
    status bool default 0,
    user_id CHAR(36),
    task_date date,
    worked_hours time,
    created_at datetime default(now()),
    FOREIGN KEY (user_id) REFERENCES alt_users(id)
);


-- task_types
CREATE TABLE IF NOT EXISTS alt_task_types(
	`id` CHAR(36) PRIMARY KEY,
    `options` VARCHAR(255),
    created_at datetime default(now())
);

    
CREATE TABLE IF NOT EXISTS alt_projects(
	`id` CHAR(36) PRIMARY KEY,
    `options` VARCHAR(255),
    created_at datetime default(now())
);

CREATE TABLE IF NOT EXISTS alt_db.alt_companies(
	`id` CHAR(36) PRIMARY KEY,
    `options` VARCHAR(255),
    `created_at` datetime default(now())
);



CREATE TABLE IF NOT EXISTS alt_hour_types(
	`id` CHAR(36) PRIMARY KEY,
    `options` VARCHAR(255),
    created_at datetime default(now())
);


DELIMITER $$

CREATE TRIGGER  updated_task_worked_hours
BEFORE UPDATE ON ALT_TASKS
FOR EACH ROW
BEGIN
    IF OLD.entry_time <> NEW.entry_time or OLD.exit_time <> NEW.exit_time
    THEN
        SET NEW.worked_hours = timediff(NEW.exit_time, NEW.entry_time);
    END IF;
END $$

DELIMITER ;


