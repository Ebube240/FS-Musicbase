const API_URL = "http://localhost:5000/artists";
let editingArtistId = null;

async function loadArtists() {
    const response = await fetch(API_URL);
    const artists = await response.json();

    const table = document.getElementById("artistTable");
    table.innerHTML = "";

    artists.forEach((artist) => {
        table.innerHTML += `
            <tr>
                <td>${artist.artist_id}</td>
                <td>${artist.artist_name}</td>
                <td>${artist.genre}</td>
                <td>${artist.monthly_listeners}</td>
                <td>
                    <button onclick="editArtist(${artist.artist_id})">Edit</button>
                    <button onclick="deleteArtist(${artist.artist_id})">Delete</button>
                </td>
            </tr>
        `;
    });
}

function resetArtistForm() {
    document.getElementById("artist_name").value = "";
    document.getElementById("genre").value = "";
    document.getElementById("monthly_listeners").value = "";
    editingArtistId = null;
    document.getElementById("artist-action-btn").textContent = "Create Artist";
}

async function createArtist() {
    const artist_name = document.getElementById("artist_name").value.trim();
    const genre = document.getElementById("genre").value.trim();
    const monthly_listeners = parseInt(document.getElementById("monthly_listeners").value, 10) || null;

    const method = editingArtistId ? "PUT" : "POST";
    const url = editingArtistId ? `${API_URL}/${editingArtistId}` : API_URL;

    await fetch(url, {
        method,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            artist_name,
            genre,
            monthly_listeners
        })
    });

    resetArtistForm();
    loadArtists();
}

async function editArtist(id) {
    const response = await fetch(`${API_URL}/${id}`);
    const artist = await response.json();

    document.getElementById("artist_name").value = artist.artist_name || "";
    document.getElementById("genre").value = artist.genre || "";
    document.getElementById("monthly_listeners").value = artist.monthly_listeners || "";
    editingArtistId = id;
    document.getElementById("artist-action-btn").textContent = "Update Artist";
}

async function deleteArtist(id) {
    await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    });

    if (editingArtistId === id) {
        resetArtistForm();
    }

    loadArtists();
}

loadArtists();