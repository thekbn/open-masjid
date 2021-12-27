-- Table Definition ----------------------------------------------

CREATE TABLE masjids (
    id SERIAL PRIMARY KEY,
    name text NOT NULL,
    address text
);

CREATE TABLE salah (
    name text PRIMARY KEY,
    description text
);

CREATE TABLE iqamah (
    id SERIAL PRIMARY KEY,
    masjid_id integer NOT NULL REFERENCES masjids(id),
    salah text NOT NULL REFERENCES salah(name),
    time time without time zone
);

INSERT INTO salah (name) values ('Fajr');
INSERT INTO salah (name) values ('Zuhr');
INSERT INTO salah (name) values ('Asr');
INSERT INTO salah (name) values ('Maghrib');
INSERT INTO salah (name) values ('Isha');
INSERT INTO salah (name) values ('Jummuah');

