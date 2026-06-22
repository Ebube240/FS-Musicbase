const API_URL = "http://localhost:5000/albums";
let editingAlbumId = null;

async function loadAlbums() {
    const response = await fetch(API_URL);
    const albums = await response.json();

    const table = document.getElementById("albumTable");
    table.innerHTML = "";

    albums.forEach((album) => {
        table.innerHTML += `
            <tr>
                <td>${album.album_id}</td>
                <td>${album.album_name}</td>
                <td>${album.release_year}</td>
                <td>${album.number_of_listens}</td>
                <td>${album.artist_id}</td>
                <td>
                    <button onclick="editAlbum(${album.album_id})">Edit</button>
                    <button onclick="deleteAlbum(${album.album_id})">Delete</button>
                </td>
            </tr>
        `;
    });
}

function resetAlbumForm() {
    document.getElementById("album_name").value = "";
    document.getElementById("release_year").value = "";
    document.getElementById("number_of_listens").value = "";
    document.getElementById("artist_id").value = "";
    editingAlbumId = null;
    document.getElementById("album-action-btn").textContent = "Create Album";
}

async function createAlbum() {
    const album_name = document.getElementById("album_name").value.trim();
    const release_year = parseInt(document.getElementById("release_year").value, 10) || null;
    const number_of_listens = parseInt(document.getElementById("number_of_listens").value, 10) || null;
    const artist_id = parseInt(document.getElementById("artist_id").value, 10) || null;

    const method = editingAlbumId ? "PUT" : "POST";
    const url = editingAlbumId ? `${API_URL}/${editingAlbumId}` : API_URL;

    await fetch(url, {
        method,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            album_name,
            release_year,
            number_of_listens,
            artist_id
        })
    });

    resetAlbumForm();
    loadAlbums();
}

async function editAlbum(id) {
    const response = await fetch(`${API_URL}/${id}`);
    const album = await response.json();

    document.getElementById("album_name").value = album.album_name || "";
    document.getElementById("release_year").value = album.release_year || "";
    document.getElementById("number_of_listens").value = album.number_of_listens || "";
    document.getElementById("artist_id").value = album.artist_id || "";
    editingAlbumId = id;
    document.getElementById("album-action-btn").textContent = "Update Album";
}

async function deleteAlbum(id) {
    await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    });

    if (editingAlbumId === id) {
        resetAlbumForm();
    }

    loadAlbums();
}

loadAlbums();