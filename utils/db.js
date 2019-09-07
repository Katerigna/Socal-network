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
