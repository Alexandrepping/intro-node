const express = require("express");
const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());

const projects = [];

app.get("/projects", (request, response) => {
  /*const { title, owner } = request.query;

  console.log(title);
  console.log(owner);
  console.log(request.query);
*/
  return response.json(projects);
});

app.post("/projects", (request, response) => {
  const { title, owner } = request.body;

  const project = { id: uuid(), title, owner };

  projects.push(project);

  return response.json(project);
});

app.put("/projects/:id", (request, response) => {
  const { id } = request.params;
  const { title, owner } = request.body;

  const projectIndex = projects.findIndex((project) => project.id === id);

  if (projectIndex < 0) {
    return response.status(400).json({ error: "Project not found." });
  }

  const project = {
    id,
    title,
    owner,
  };

  project[projectIndex] = project;

  return response.json(project);
});

app.delete("/projects/:id", (request, response) => {
  /*const { id } = request.params;
  const { title, owner } = request.body;

  const projectIndex = projects.findIndex((project) => project.id === id);

  if (projectIndex < 0) {
    return response.status(400).json({ error: "Project not found." });
  }
  projects.slice(projectIndex, 1);

  response.json({
    message: `projeto ${id} deletado`,
  });*/

  const projectid = request.params.id;

  let project = projects.filter((project) => {
    return project.id == projectid;
  })[0];

  projectIndex = projects.indexOf(project);

  projects.slice(projectIndex, 1);

  response.json({
    message: `Projeto ${projectid} deletado`,
  });
});

const port = 3333;
app.listen(3333, () => {
  console.log(`Server up and running on PORT ${port}`);
});
