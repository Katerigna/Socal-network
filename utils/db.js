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
            FROM users WHERE first ILIKE $1 OR last ILIKE $1
        `,
            [name + "%"]
        )
        .then(({ rows }) => {
            return rows;
        });
};

exports.getFriendStatus = function(receiver_id, sender_id) {
    return db
        .query(
            `SELECT * FROM friendships
        WHERE (receiver_id = $1 AND sender_id = $2)
        OR (receiver_id = $2 AND sender_id = $1)`,
            [receiver_id, sender_id]
        )
        .then(({ rows }) => {
            return rows;
        });
};

exports.addFriendRequest = function(receiver_id, sender_id) {
    return db
        .query(
            `INSERT INTO friendships (receiver_id, sender_id) VALUES ($1, $2) RETURNING id`,
            [receiver_id, sender_id]
        )
        .then(({ rows }) => {
            return rows;
        });
};

exports.addFriend = function(receiver_id, sender_id) {
    console.log("db on addFiend", receiver_id, sender_id);
    return db
        .query(
            `UPDATE friendships SET accepted=TRUE WHERE (receiver_id = $1 AND sender_id = $2) OR (receiver_id = $2 AND sender_id = $1) RETURNING id, receiver_id, sender_id`,
            [receiver_id, sender_id]
        )
        .then(({ rows }) => {
            console.log("rows", rows);
            return rows;
        });
};

exports.deleteFriendRequest = function(receiver_id, sender_id) {
    return db
        .query(
            `DELETE FROM friendships
        WHERE (receiver_id = $1 AND sender_id = $2)
        OR (receiver_id = $2 AND sender_id = $1)`,
            [receiver_id, sender_id]
        )
        .then(({ rows }) => {
            return rows;
        });
};

exports.getFriendsWannabes = function(receiver_id) {
    return db
        .query(
            `SELECT users.id, users.first, users.last, users.url, friendships.accepted, friendships.sender_id, friendships.receiver_id
    FROM friendships
    JOIN users
    ON (accepted = false AND receiver_id = $1 AND sender_id = users.id)
    OR (accepted = true AND receiver_id = $1 AND sender_id = users.id)
    OR (accepted = true AND receiver_id = $1 AND receiver_id = users.id)`,
            [receiver_id]
        )
        .then(({ rows }) => {
            return rows;
        });
};

exports.getChatMessages = function() {
    return db
        .query(
            `SELECT users.id, users.first, users.last, users.url, messages.id, messages.sender_id, messages.message, messages.posted_at
        FROM messages
        JOIN users
        ON sender_id = users.id ORDER BY posted_at DESC LIMIT 10;`
        )
        .then(({ rows }) => {
            return rows;
        });
};

exports.addMessage = function(msg, sender_id) {
    return db
        .query(
            `INSERT INTO messages (message, sender_id) VALUES ($1, $2) RETURNING *`,
            [msg, sender_id]
        )
        .then(({ rows }) => {
            return rows;
        });
};
