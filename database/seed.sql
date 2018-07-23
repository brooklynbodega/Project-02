-- connect to databae
\c volunteer02_db

-- remove existing data before inserting new data
DELETE FROM volunteers;
DELETE FROM projects;
DELETE FROM project_groups;

-- create houses
INSERT INTO volunteers (fullname, email) VALUES ('John Doe', 'jd@email.com'), ('Jane Smith', 'js@email.com'), ('Denzel White', 'dw@email.com');

INSERT INTO projects
    (project_name, description)
VALUES
    ('Community Garden', 'Spend an afternoon harvesting local veggies, building raised soil beds, and composting decayed consumables!'),
    ('Animal Shelter', 'Come and meet adorable cats & dogs up for rescue. Their quarters need cleaning and then the animals themselves need some exercise. The cats love to play and the dogs are always excited for a walk!'),
    ('Senior Center', 'Vist our senior residents at the Cobble Hill Community Center. We have an arts & crafts hour, a one-on-one reading session, late afternoon strolls through the park, and much more to offer. There is plenty to learn and fun to be had!');

INSERT INTO project_groups (volunteer_id, project_id) VALUES 
(3, 1), 
(2, 2), 
(2, 3);