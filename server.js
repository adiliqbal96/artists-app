const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

let artists = [
  { id: 1, name: "Artist 1" },
  { id: 2, name: "Artist 2" },
];

app.get("/artists", (req, res) => {
  console.log("Artists sent to client:", artists);
  res.json(artists);
});

app.post("/artists", (req, res) => {
  const newId = artists.length ? Math.max(...artists.map((a) => a.id)) + 1 : 1;
  const newArtist = {
    id: newId,
    name: req.body.name,
  };
  artists.push(newArtist);
  res.json(newArtist);
});

app.put("/artists/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const artistIndex = artists.findIndex((a) => a.id === parseInt(id, 10));
  if (artistIndex > -1) {
    artists[artistIndex].name = name;
    res.json(artists[artistIndex]);
  } else {
    res.status(404).json({ message: "Artist not found" });
  }
});

app.delete("/artists/:id", (req, res) => {
  const { id } = req.params;
  artists = artists.filter((a) => a.id !== parseInt(id, 10));
  res.json({ message: "Artist deleted" });
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000/");
});
