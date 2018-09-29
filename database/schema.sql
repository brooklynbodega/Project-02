DROP DATABASE volunteer02_db;

CREATE DATABASE volunteer02_db;

\c volunteer02_db;

DROP TABLE IF EXISTS volunteers;
DROP TABLE IF EXISTS projects;
DROP TABLE IF EXISTS project_group;

CREATE TABLE volunteers (
    id SERIAL PRIMARY KEY,
    fullname TEXT NOT NULL,
    email TEXT NOT NULL
    -- username TEXT NOT NULL,
    -- password_digest TEXT NOT NULL
);

CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    project_name TEXT NOT NULL,
    description TEXT NOT NULL
);

CREATE TABLE project_groups (
    group_id SERIAL PRIMARY KEY,
    volunteer_id INTEGER REFERENCES volunteers(id),
    project_id INTEGER REFERENCES projects(id)
);