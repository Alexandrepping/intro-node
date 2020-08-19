const express = require("express");
const { uuid, isUuid } = require("uuidv4");

const app = express();

app.use(express.json());

/**
 * Middleware
 * Interceptador de requisições que pode interromper totalmente a requisição ou
 * alterar dados da requisição
 */

const projects = [];
/**
 * o uso do middleware = qdo quiser que um trecho de codigo seja disparado de forma automática
 * em uma ou mais rotas da nossa aplicação
 */
function logRequest(request, response, next) {
  const { method, url } = response;

  const logLabel = `[${method.toUpperCase()}] ${url}`;

  console.time(logLabel);
  next(); // proximo middleware

  console.timeEnd(logLabel);
}

function validateProjectId(request, response, next) {
  const { id } = request.params;

  if (!isUuid(id)) {
    return response
      .status(400)
      .json({ error: `Param sent isn't a valida UUID` });
  }
  next();
}

app.use(logRequest);
//app.use("/projects/:id", validateProjectId);

app.get("/projects", (request, response) => {
  const { title } = request.query;

  // estrutura condicional ternária
  const results = title
    ? projects.filter((project) => project.title.includes(title))
    : projects;

  return response.json(projects);
});

app.post("/projects", (request, response) => {
  const { title, owner } = request.body;

  const project = { id: uuid(), title, owner };

  projects.push(project);

  return response.json(project);
});

app.put("/projects/:id", validateProjectId, (request, response) => {
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

app.delete("/projects/:id", validateProjectId, (request, response) => {
  const { id } = request.params;
  const { title, owner } = request.body;

  const projectIndex = projects.findIndex((project) => project.id === id);

  if (projectIndex < 0) {
    return response.status(400).json({ error: "Project not found." });
  }
  projects.splice(projectIndex, 1);

  return response.status(204).send();

  /* response.json({
    message: `projeto ${id} deletado`,
  });*/

  /* const projectid = request.params.id;

  let project = projects.filter((project) => {
    return project.id == projectid;
  })[0];

  projectIndex = projects.indexOf(project);

  projects.slice(projectIndex, 1);

  response.json({
    message: `Projeto ${projectid} deletado`,
  });*/
});

const port = 3335;
app.listen(3335, () => {
  console.log(`Server up and running on PORT ${port}`);
});
