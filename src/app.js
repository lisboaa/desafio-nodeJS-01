const express = require("express");
const cors = require("cors");

const { uuid,isUuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories)
});

app.post("/repositories", (request, response) => {
  const { id, title, url, techs, likes } = request.body

  const repositorio = { id: uuid(), title, url, techs, likes:0};

  repositories.push(repositorio);

  return response.json(repositorio);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title,  url, techs} = request.body;

  const repositoriesFindId = repositories.findIndex(repositorio => repositorio.id == id);

  if( repositoriesFindId < 0) {
    return response.status(400).send();
  }

  const repositorie = {
    id,
    title,
    url,
    techs,
    likes: repositories[repositoriesFindId].likes
  };

  repositories[repositoriesFindId] = repositorie;

  return response.json(repositorie)
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repositoriesFindId =  repositories.findIndex(repositorio => repositorio.id == id);

  if(repositoriesFindId < 0) {
    return response.status(400).json({ error: 'Not found id in repositories.'})
  }

  repositories.splice(repositoriesFindId, 1);
  return response.send(204).send();
});


app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repository = repositories.find(repositorio => repositorio.id == id);

  if(!repository) {
    return response.status(400).send();
  }

  repository.likes += 1;

  return response.json(repository)

});

module.exports = app;
