PRAGMA foreign_keys = ON;

DROP TABLE IF EXISTS songs;
DROP TABLE IF EXISTS albums;
DROP TABLE IF EXISTS artists;

CREATE TABLE artists (
    artist_id INTEGER PRIMARY KEY AUTOINCREMENT,
    artist_name TEXT NOT NULL,
    genre TEXT NOT NULL,
    monthly_listeners INTEGER
);

CREATE TABLE albums (
    album_id INTEGER PRIMARY KEY AUTOINCREMENT,
    album_name TEXT NOT NULL,
    release_year INTEGER,
    number_of_listens INTEGER,
    artist_id INTEGER,
    FOREIGN KEY (artist_id)
        REFERENCES artists(artist_id)
        ON DELETE CASCADE
);

CREATE TABLE songs (
    song_id INTEGER PRIMARY KEY AUTOINCREMENT,
    song_name TEXT NOT NULL,
    release_year INTEGER,
    album_id INTEGER,
    FOREIGN KEY (album_id)
        REFERENCES albums(album_id)
        ON DELETE CASCADE
);

INSERT INTO artists (artist_name, genre, monthly_listeners) VALUES
('Pink Floyd', 'Progressive Rock', 100000000),
('Kendrick Lamar', 'Hip-Hop', 75000000);

INSERT INTO albums (album_name, release_year, number_of_listens, artist_id) VALUES
('The Dark Side of the Moon', 1973, 5000000, 1),
('Wish You Were Here', 1975, 7000000, 1),
('Animals', 1977, 4500000, 1),
('To Pimp a Butterfly', 2015, 6000000, 2),
('Mr. Morale & The Big Steppers', 2022, 5500000, 2);

INSERT INTO songs (song_name, release_year, album_id) VALUES
('Money', 1973, 1),
('Us and Them', 1973, 1),
('Wish You Were Here', 1975, 2),
('Shine On You Crazy Diamond', 1975, 2),
('Dogs', 1977, 3),
('Sheep', 1977, 3),
('Wesleys Theory', 2015, 4),
('U', 2015, 4),
('United In Grief', 2022, 5),
('Father Time', 2022, 5);