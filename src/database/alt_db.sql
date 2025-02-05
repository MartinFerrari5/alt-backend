-- DROP DATABASE alt_db;

USE alt_db;
-- Usuarios
CREATE TABLE IF NOT EXISTS alt_users (
  id CHAR(36) PRIMARY KEY, -- Use UUIDs as 36-character strings
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password varchar(255) not null,
  role varchar(100) not null DEFAULT("employee")
);


-- Emails permitidos
CREATE TABLE IF NOT EXISTS emails (
	id CHAR(36) PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE
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
    FOREIGN KEY (user_id) REFERENCES alt_users(id)
);

-- select *,sec_to_time(sum(time_to_Sec(worked_hours)) over()) as total from alt_db.alt_tasks ;-- where task_Date = 20241213;

-- task_types
CREATE TABLE IF NOT EXISTS alt_task_types(
	`id` CHAR(36) PRIMARY KEY,
    `options` VARCHAR(255)
);

    
CREATE TABLE IF NOT EXISTS alt_projects(
	`id` CHAR(36) PRIMARY KEY,
    `options` VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS alt_companies(
	`id` CHAR(36) PRIMARY KEY,
    `options` VARCHAR(255)
);


CREATE TABLE IF NOT EXISTS alt_hour_types(
	`id` CHAR(36) PRIMARY KEY,
    `options` VARCHAR(255)
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
