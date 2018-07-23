// This file--'models/Volunteer.js'--requires 'databaseb/connection.js'. This file is REQUIRED BY 'server.js'
const db = require('../database/connection.js');

// console.log(db);

const Volunteer = {};

// Find all volunteers function
Volunteer.all = () => {
    return db.any('SELECT * FROM volunteers ORDER BY id ASC');
};

// Find one volunteer function
Volunteer.find = (id) => {
    return db.one('SELECT * FROM volunteers WHERE id = $1', [id])
};

// Find all projects assigned to a volunteer function dynamically


// Create a new volunteer function
Volunteer.create = (newVolunteer) => {
    return db.one(`INSERT INTO volunteers (fullname, email) VALUES ($<fullname>, $<email>) RETURNING *`, newVolunteer)
};

// Create new volunteer to sign up for project; INSERT JOIN


// Delete a volunteer function; determine parameter values
Volunteer.delete = (id) => {
    return db.result(`DELETE FROM volunteers WHERE id = ${id}`, { id: id })
};

// Update a user's information
Volunteer.update = (updateVolunteer) => {
    return db.none(`UPDATE volunteers SET fullname = $<fullname>, email = $<email> WHERE id = $<id>`, updateVolunteer)
};

module.exports = Volunteer;