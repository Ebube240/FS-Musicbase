const db = require("../db");

exports.getAllAlbums = (req, res) => {
    db.all("SELECT * FROM albums", [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.json(rows);
    });
};

exports.getAlbumById = (req, res) => {
    db.get(
        "SELECT * FROM albums WHERE album_id = ?",
        [req.params.id],
        (err, row) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (!row) {
                return res.status(404).json({ message: "Album not found" });
            }

            res.json(row);
        }
    );
};

exports.createAlbum = (req, res) => {
    const {
        album_name,
        release_year,
        number_of_listens,
        artist_id
    } = req.body;

    db.run(
        `INSERT INTO albums
        (album_name, release_year, number_of_listens, artist_id)
        VALUES (?, ?, ?, ?)`,
        [album_name, release_year, number_of_listens, artist_id],
        function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            res.status(201).json({
                message: "Album created",
                id: this.lastID
            });
        }
    );
};

exports.updateAlbum = (req, res) => {
    const {
        album_name,
        release_year,
        number_of_listens,
        artist_id
    } = req.body;

    db.run(
        `UPDATE albums
         SET album_name = ?,
             release_year = ?,
             number_of_listens = ?,
             artist_id = ?
         WHERE album_id = ?`,
        [
            album_name,
            release_year,
            number_of_listens,
            artist_id,
            req.params.id
        ],
        function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (this.changes === 0) {
                return res.status(404).json({ message: "Album not found" });
            }

            res.json({
                message: "Album updated"
            });
        }
    );
};

exports.deleteAlbum = (req, res) => {
    db.run(
        "DELETE FROM albums WHERE album_id = ?",
        [req.params.id],
        function (err) {
            if (err) {
                return res.status(500).json({ error: err.message });
            }
            if (this.changes === 0) {
                return res.status(404).json({ message: "Album not found" });
            }

            res.json({
                message: "Album deleted"
            });
        }
    );
};