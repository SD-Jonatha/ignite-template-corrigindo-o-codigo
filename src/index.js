const express = require("express");

const { v4: uuid } = require("uuid");

const app = express();

app.use(express.json());

const repositories = [];

app.get("/repositories", (request, response) => {


  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body

  const repository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  };

  repositories.push(repository);

  return response.status(201).json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;
  
  

 const repositoryIndex = repositories
  .find(repository => repository.id === id);

  

  if (!repositoryIndex) {
    return response
    .status(404)
    .json({ error: "Repository not found" });
  }

  if(title){
    repositoryIndex.title = title
  };

  if(url){
    repositoryIndex.url = url
  };
  if(techs){
    repositoryIndex.techs = techs
  };



  /* const repository = { ...repositories[repositoryIndex], ...updatedRepository };

  repositories[repositoryIndex] = repository; */

  return response.json(repositoryIndex);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex < 0) {
    return response.status(404).json({ error: "Repository not found" });
  }

  repositories.splice(repositoryIndex, 1);

  return response.status(204).json();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  

  const repositoryIndex = repositories.find(repository => repository.id === id);
  if (!repositoryIndex) {
    return response.status(404).json({ error: "Repository not found" });
  }

  repositoryIndex.likes = ++repositoryIndex.likes;
  
 

  return response.json(repositoryIndex);
});

module.exports = app;
