# Project-2-Volunteer

* The project's name and description:

This is the CommunityCares Volunteer site. Via this website, users can browse, edit, create, and sign up for volunteer projects.

* A link to your video presentation (see below):

To Be Provided

* Your wireframes and user stories:

Wireframes located here: https://drive.google.com/open?id=17oyjjUMQXPff4kJ0-EXhuHdDBy2B47Sxa5KiY0R2fPE

User Stories:
As a User Leader, I want to create a volunteer opportunity so others can see it & sign up.
As a User Leader, I want to edit a volunteer opportunity so volunteers can be informed of changes.
As a User Volunteer, I want to sign up for a volunteer opportunity so I can help my local community.
As a User Leader & Volunteer, I want to email other volunteers so we can coordinate for the project.

* The technologies, APIs, and modules you used and a description of each:

Node.js, Express, SQL, & pg-promise. I want to implement MapBox's API in the future to give directions to a project.

* A code snippet of a part of the app you're particularly proud of:

My function from my 'Project.js' file:

// Find all volunteers on a project function dynamically
Project.findVolunteers = (projectVolunteers) => {
    return db.any(`SELECT * FROM volunteers 
    JOIN project_groups ON volunteers.id = project_groups.volunteer_id 
    JOIN projects ON project_groups.project_id = projects.id 
    WHERE projects.id = $1`, [projectVolunteers]
    )
};

which is called in my 'server.js' file:

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

* Any things you plan to fix or features you plan to add:

- Fix sign-up page/Add user authorization for unique views and profile creation.
- Add images
- Implement map API

* Instructions for downloading the code and running it on localhost

- Follow this GitHub link: https://git.generalassemb.ly/brooklynbodega/Project-2-Volunteer
- If you have a GitHub account, 'fork' this repository to your account.
- Next, click on the green "Clone or Download" button and choose either the HTTPS or SSH key link, depending on your account features.
- Open up your CLI (terminal, iTerm, etc.), and move into the directory you wish to save this code.
- Once in the desired directory, type 'git clone ' followed by the repo link and press 'Enter'.
- Move into the newly created git directory and you're all set to begin coding!
