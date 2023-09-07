let artists = [];

async function loadArtists() {
  const res = await fetch("http://localhost:3000/artists");
  const data = await res.json();

  artists = data;

  displayArtists(artists);
}

async function addArtist() {
  const name = document.getElementById("new-artist").value;
  const res = await fetch("http://localhost:3000/artists", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  });
  if (res.ok) {
    loadArtists();
  }
}

async function deleteArtist(id) {
  const res = await fetch(`http://localhost:3000/artists/${id}`, {
    method: "DELETE",
  });
  if (res.ok) {
    loadArtists();
  }
}

async function editArtist(id, newName) {
  const res = await fetch(`http://localhost:3000/artists/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: newName }),
  });
  if (res.ok) {
    loadArtists();
  }
}

function showEditPrompt(id, currentName) {
  const newName = prompt("Edit artist name:", currentName);
  if (newName) {
    editArtist(id, newName);
  }
}

function displayArtists(artistsToDisplay) {
  const ul = document.getElementById("artist-list");
  ul.innerHTML = "";

  for (const artist of artistsToDisplay) {
    const li = document.createElement("li");
    li.textContent = artist.name;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => deleteArtist(artist.id));
    li.appendChild(deleteButton);

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.addEventListener("click", () =>
      showEditPrompt(artist.id, artist.name)
    );
    li.appendChild(editButton);

    ul.appendChild(li);
  }
}

function sortArtists() {
  const sortedArtists = [...artists].sort((a, b) =>
    a.name.localeCompare(b.name)
  );
  displayArtists(sortedArtists);
}

// Initial load
loadArtists();
