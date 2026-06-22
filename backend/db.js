const sqlite3 = require("sqlite3").verbose();
const fs = require("fs");
const path = require("path");

const dataDir = path.join(__dirname, "data");
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = path.join(dataDir, "app.db");
const dbExists = fs.existsSync(dbPath);

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error(err.message);
        return;
    }

    db.run("PRAGMA foreign_keys = ON;", (fkErr) => {
        if (fkErr) {
            console.error("Failed to enable foreign keys:", fkErr.message);
        }
    });

    if (!dbExists) {
        initializeDatabase();
    } else {
        db.get(
            "SELECT name FROM sqlite_master WHERE type='table' AND name='artists'",
            (metaErr, row) => {
                if (metaErr) {
                    console.error(metaErr.message);
                } else if (!row) {
                    initializeDatabase();
                } else {
                    console.log("SQLite database ready.");
                }
            }
        );
    }
});

function initializeDatabase() {
    const sql = fs.readFileSync(path.join(__dirname, "model.sql")).toString();
    db.exec(sql, (err) => {
        if (err) {
            console.error(err.message);
        } else {
            console.log("Database initialized.");
        }
    });
}

module.exports = db;