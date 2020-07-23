const express = require("express");

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

  const projects = { title, owner };

  return response.json(["Projeto 1", "Projeto 2", "Projeto 3"]);
});

app.put("/projects/:id", (request, response) => {
  const { id } = request.params;
  console.log(id);

  return response.json(["Projeto 4", "Projeto 2", "Projeto 3"]);
});

app.delete("/projects/:id", (request, response) => {
  return response.json(["Projeto 2", "Projeto 3"]);
});

const port = 3333;
app.listen(3333, () => {
  console.log(`Server up and running on PORT ${port}`);
});
