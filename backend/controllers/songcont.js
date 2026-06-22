const db = require("../db");

exports.getAllSongs = (req, res) => {
    db.all("SELECT * FROM songs", [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.json(rows);
    });
};

exports.getSongById = (req, res) => {
    db.get(
        "SELECT * FROM songs WHERE song_id = ?",
        [req.params.id],
        (err, row) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (!row) {
                return res.status(404).json({ message: "Song not found" });
            }

            res.json(row);
        }
    );
};

exports.createSong = (req, res) => {
    const {
        song_name,
        release_year,
        album_id
    } = req.body;

    db.run(
        `INSERT INTO songs
        (song_name, release_year, album_id)
        VALUES (?, ?, ?)`,
        [song_name, release_year, album_id],
        function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            res.status(201).json({
                message: "Song created",
                id: this.lastID
            });
        }
    );
};

exports.updateSong = (req, res) => {
    const {
        song_name,
        release_year,
        album_id
    } = req.body;

    db.run(
        `UPDATE songs
         SET song_name = ?,
             release_year = ?,
             album_id = ?
         WHERE song_id = ?`,
        [
            song_name,
            release_year,
            album_id,
            req.params.id
        ],
        function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (this.changes === 0) {
                return res.status(404).json({ message: "Song not found" });
            }

            res.json({
                message: "Song updated"
            });
        }
    );
};

exports.deleteSong = (req, res) => {
    db.run(
        "DELETE FROM songs WHERE song_id = ?",
        [req.params.id],
        function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (this.changes === 0) {
                return res.status(404).json({ message: "Song not found" });
            }

            res.json({
                message: "Song deleted"
            });
        }
    );
};