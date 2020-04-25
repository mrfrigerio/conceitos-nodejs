const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;
  const repo = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0,
  };
  repositories.push(repo);
  return response.json(repo);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const repo = repositories.find((r) => id === r.id);
  if (!repo) {
    return response.status(400).json({ error: "Repository not found!" });
  }
  const { title, url, techs } = request.body;
  repo.title = title;
  repo.url = url;
  repo.techs = techs;
  return response.json(repo);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const repo = repositories.find((r) => id === r.id);
  if (!repo) {
    return response.status(400).json({ error: "Repository not found!" });
  }
  const index = repositories.indexOf(repo);
  repositories.splice(index, 1);
  return response.status(204).json([]);
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  const repo = repositories.find((r) => id === r.id);
  if (!repo) {
    return response.status(400).json({ error: "Repository not found!" });
  }
  const likes = repo.likes;
  repo.likes = likes + 1;
  return response.json(repo);
});

module.exports = app;
