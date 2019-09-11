const spicedPg = require("spiced-pg");
const { dbuser, dbpass } = require("../secrets.json");

const db = spicedPg(
    `postgres:${dbuser}:${dbpass}@localhost:5432/social_network`
);

exports.addUser = function(first, last, email, password) {
    return db.query(
        `INSERT INTO users (first, last, email, password) VALUES ($1, $2, $3, $4)
            RETURNING id, first, last`,
        [first, last, email, password]
    );
};

exports.getPassword = function(email) {
    return db
        .query(
            `SELECT password, id
            FROM users
            WHERE email=$1`,
            [email]
        )
        .then(({ rows }) => {
            return rows;
        });
};

exports.getUser = function(id) {
    return db
        .query(`SELECT * FROM users WHERE id=$1`, [id])
        .then(({ rows }) => {
            return rows;
        });
};

exports.addImage = function(url, id) {
    return db
        .query(
            `UPDATE users SET url=$1 WHERE id=$2 RETURNING id, first, last, url`,
            [url, id]
        )
        .then(({ rows }) => {
            return rows;
        });
};

exports.addBio = function(bio, id) {
    return db
        .query(
            `
        UPDATE users SET bio=$1 WHERE id=$2 RETURNING bio, id`,
            [bio, id]
        )
        .then(({ rows }) => {
            return rows;
        });
};

exports.getProfile = function(id) {
    return db
        .query(`SELECT id, first, last, url, bio FROM users WHERE id=$1`, [id])
        .then(({ rows }) => {
            return rows;
        });
};

exports.getLastUsers = function() {
    return db
        .query(
            `
        SELECT id, created_at, first, last, url, bio
        FROM users
        ORDER BY created_at DESC
        LIMIT 3;
        `
        )
        .then(({ rows }) => {
            return rows;
        });
};

exports.getSearchedUsers = function(name) {
    return db
        .query(
            `SELECT id, first, last, url, bio
            FROM users WHERE first || '' || last ILIKE $1
        `,
            [name + "%"]
        )
        .then(({ rows }) => {
            return rows;
        });
};
