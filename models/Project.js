// This file--'models/Project.js'--requires 'database/connection.js'.
const db = require('../database/connection.js');

// console.log(db);

const Project = {};

// Find all projects function
Project.all = () => {
    // Create a promise
    return db.any('SELECT * FROM projects ORDER BY id ASC');
};

// Find one project function
Project.find = (id) => {
    return db.one(`SELECT * FROM projects WHERE id = $1`, [id])
};

// Find all volunteers on a project function dynamically
Project.findVolunteers = (projectVolunteers) => {
    return db.any(`SELECT * FROM volunteers 
    JOIN project_groups ON volunteers.id = project_groups.volunteer_id 
    JOIN projects ON project_groups.project_id = projects.id 
    WHERE projects.id = $1`, [projectVolunteers]
    )
};

// Create a new project function
Project.create = (newProject) => {
    return db.one(`INSERT INTO projects (project_name, description) VALUES ($<project_name>, $<description>) RETURNING *`, newProject)
};

// Delete a project function; determine parameter values
Project.delete = (id) => {
    return db.result(`DELETE FROM projects WHERE id = ${id}`, {id: id})
};

// Update a project's information
Project.update = (updateProject) => {
    return db.none(`UPDATE projects SET project_name = $<project_name>, description = $<description> WHERE id = $<id>`, updateProject)
};

module.exports = Project;