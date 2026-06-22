const db = require("../db");

exports.getAllArtists = (req, res) => {
    db.all("SELECT * FROM artists", [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
};

exports.getArtistById = (req, res) => {
    db.get(
        "SELECT * FROM artists WHERE artist_id = ?",
        [req.params.id],
        (err, row) => {
            if (err) return res.status(500).json({ error: err.message });
            if (!row) return res.status(404).json({ message: "Artist not found" });
            res.json(row);
        }
    );
};

exports.createArtist = (req, res) => {
    const { artist_name, genre, monthly_listeners } = req.body;

    db.run(
        "INSERT INTO artists (artist_name, genre, monthly_listeners) VALUES (?, ?, ?)",
        [artist_name, genre, monthly_listeners],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });

            res.status(201).json({
                message: "Artist created",
                id: this.lastID
            });
        }
    );
};

exports.updateArtist = (req, res) => {
    const { artist_name, genre, monthly_listeners } = req.body;

    db.run(
        `UPDATE artists
         SET artist_name = ?, genre = ?, monthly_listeners = ?
         WHERE artist_id = ?`,
        [artist_name, genre, monthly_listeners, req.params.id],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            if (this.changes === 0) return res.status(404).json({ message: "Artist not found" });
            res.json({ message: "Artist updated" });
        }
    );
};

exports.deleteArtist = (req, res) => {
    db.run(
        "DELETE FROM artists WHERE artist_id = ?",
        [req.params.id],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            if (this.changes === 0) return res.status(404).json({ message: "Artist not found" });
            res.json({ message: "Artist deleted" });
        }
    );
};