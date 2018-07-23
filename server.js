const express = require("express");
const session = require("express-session");
const path = require('path');
const db = require('./database/connection')
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const app = express();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const Volunteer = (require('./models/Volunteer'))
const Project = (require('./models/Project'))

app.use('/public', express.static("public"));
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.use(
    session({
        secret: "some random string we should change for our application",
        resave: false,
        saveUninitialized: true
    })
);
const PORT = process.env.PORT || 4567;

// Render the home page
app.get('/', (request, response) => {
    response.render('home/index');
});

// TEST: Render the page count for a user.
// app.get('/', (request, response) => {
//     if (request.session.viewCount) {
//         request.session.viewCount++;
//     } else {
//         request.session.viewCount = 1;
//     }
//     response.send(
//         `<p>You have viewed this page ${request.session.viewCount} times</p>`
//     );
// });

// // Render the login page
// app.get('/login', (request, response) => {
//     response.render('login/index.ejs')
//     // add an object? { title: Login}
// });

// // 
// app.post("/login", (request, response) => { });

// // Render the registration page
// app.get('/register', (request, response) => {
//     response.render('login/register.ejs')
//     // add an object? { title: Register}
// });

// app.post("/register", (request, response) => { });

// Render the Projects page
app.get('/projects', (request, response) => {
    const id = Number(request.params.id);
    Project.all().then(projectsAll => {
        response.render('projects/index', {
            projects: projectsAll
        })
    })
});

// Post a new project to the projects index page
app.post('/projects', (request, response) => {
    const newProject = request.body;
    Project.create(newProject).then(newProjectData => {
        response.redirect(302, 'projects');
    })
});

// Render the project creation page
app.get('/projects/new', (request, response) => {
    response.render('projects/new.ejs');
});

// Render one project, it's description, and it's volunteers
app.get('/projects/:id', (request, response) => {
    const id = Number(request.params.id);
    Project.find(id).then(projectData => {
        // Render the volunteers for one project
        Project.findVolunteers(id).then(projectVolunteers => {
            response.render('projects/show.ejs', {
                project: projectData,
                volunteers: projectVolunteers
            })
        })
    })
});

// Delete one project
app.delete('/projects/:id', (request, response) => {
    const id = Number(request.params.id);
    Project.delete(id).then((deleteProject) => {
        response.redirect(302, '/projects');
    })
});

// Render the volunteer project SIGNUP page
app.get('/projects/:id/signup', (request, response) => {
    const id = Number(request.params.id);
    Project.find(id).then(projectData => {
        response.render('projects/signup.ejs', {
            project: projectData
        })
    })
});

// Access project update page
app.get('/projects/:id/update', (request, response) => {
    const id = Number(request.params.id);
    Project.find(id).then(projectUpdate => {
        response.render('projects/update', {
            project: projectUpdate
        })
    })
});

// Render updated project information
app.put('/projects/:id', (request, response) => {
    const id = Number(request.params.id);
    const projectUpdates = request.body;
    projectUpdates.id = request.params.id;
    Project.update(projectUpdates).then(() => {
        response.redirect(302, '/projects')
    })
});

// Render the volunteers page
app.get('/volunteers', (request, response) => {
    const id = Number(request.params.id);
    Volunteer.all().then(volunteersAll => {
        response.render('volunteers/index.ejs', {
            volunteers: volunteersAll
        })
    })
});

// Post the new volunteer to the volunteers index page
app.post('/volunteers', (request, response) => {
    const newVolunteer = request.body;
    Volunteer.create(newVolunteer).then(newVolunteerData => {
        response.redirect(302, 'volunteers');
    })
});

// Render the new volunteer creation page
app.get('/volunteers/new', (request, response) => {
    response.render('volunteers/new.ejs');
});

// Render page for one volunteer
app.get('/volunteers/:id', (request, response) => {
    const id = Number(request.params.id);
    Volunteer.find(id).then(volunteerData => {
        response.render('volunteers/show.ejs', { volunteer: volunteerData })
    })
});

// Delete one volunteer's profile page
app.delete('/volunteers/:id', (request, response) => {
    const id = Number(request.params.id);
    Volunteer.delete(id).then((deleteVolunteer) => {
        response.redirect(302, '/volunteers');
    })
});

// Access volunteer's profile to update
app.get('/volunteers/:id/update', (request, response) => {
    const id = Number(request.params.id);
    Volunteer.find(id).then(volunteerUpdate => {
        response.render('volunteers/update', {
            volunteer: volunteerUpdate
        })
    })
});

// Render updated volunteer information
app.put('/volunteers/:id', (request, response) => {
    const id = Number(request.params.id);
    const volunteerUpdates = request.body;
    volunteerUpdates.id = request.params.id;
    Volunteer.update(volunteerUpdates).then(() => {
        response.redirect(302, '/volunteers')
    })
});

// Check user lab for login function (request.session)

app.listen(PORT, () => {
    console.log(`Express server started on port ${PORT}`);
});
