const API_URL = "http://localhost:5000/songs";
let editingSongId = null;

async function loadSongs() {
    const response = await fetch(API_URL);
    const songs = await response.json();

    const table = document.getElementById("songTable");
    table.innerHTML = "";

    songs.forEach((song) => {
        table.innerHTML += `
            <tr>
                <td>${song.song_id}</td>
                <td>${song.song_name}</td>
                <td>${song.release_year}</td>
                <td>${song.album_id}</td>
                <td>
                    <button onclick="editSong(${song.song_id})">Edit</button>
                    <button onclick="deleteSong(${song.song_id})">Delete</button>
                </td>
            </tr>
        `;
    });
}

function resetSongForm() {
    document.getElementById("song_name").value = "";
    document.getElementById("release_year").value = "";
    document.getElementById("album_id").value = "";
    editingSongId = null;
    document.getElementById("song-action-btn").textContent = "Create Song";
}

async function createSong() {
    const song_name = document.getElementById("song_name").value.trim();
    const release_year = parseInt(document.getElementById("release_year").value, 10) || null;
    const album_id = parseInt(document.getElementById("album_id").value, 10) || null;

    const method = editingSongId ? "PUT" : "POST";
    const url = editingSongId ? `${API_URL}/${editingSongId}` : API_URL;

    await fetch(url, {
        method,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            song_name,
            release_year,
            album_id
        })
    });

    resetSongForm();
    loadSongs();
}

async function editSong(id) {
    const response = await fetch(`${API_URL}/${id}`);
    const song = await response.json();

    document.getElementById("song_name").value = song.song_name || "";
    document.getElementById("release_year").value = song.release_year || "";
    document.getElementById("album_id").value = song.album_id || "";
    editingSongId = id;
    document.getElementById("song-action-btn").textContent = "Update Song";
}

async function deleteSong(id) {
    await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    });

    if (editingSongId === id) {
        resetSongForm();
    }

    loadSongs();
}

loadSongs();