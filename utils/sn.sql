DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS friendships CASCADE;
DROP TABLE IF EXISTS messages CASCADE;

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    first VARCHAR(255) NOT NULL,
    last VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    url VARCHAR(300),
    bio VARCHAR(300),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE friendships(
    id SERIAL PRIMARY KEY,
    receiver_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    sender_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    accepted BOOLEAN DEFAULT FALSE
);

CREATE TABLE messages(
    id SERIAL PRIMARY KEY,
    sender_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    message VARCHAR(900),
    posted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

SELECT * FROM friendships
WHERE (receiver_id = $1 AND sender_id = $2)
OR (receiver_id = $2 AND sender_id = $1)

INSERT when the button says send friend request

UPDATE is when button says accept, to change the BOOLEAN

when unfriend is clicked you delete the row

when button says cancel is also delete


create table for messages
id
sender_id ref users(id)
posted DATE
timestamp


SELECT created_at, first, last, url, bio
FROM users
ORDER BY created_at DESC
LIMIT 3;

INSERT INTO friendships(receiver_id, sender_id, accepted)
WITH expanded AS (
  SELECT RANDOM(), seq, r.id AS receiver_id, s.id AS sender_id
  FROM GENERATE_SERIES(1, 500) seq, users r, users s
), shuffled AS (
  SELECT e.*
  FROM expanded e
  INNER JOIN (
    SELECT ei.seq, MIN(ei.random) FROM expanded ei GROUP BY ei.seq
  ) em ON (e.seq = em.seq AND e.random = em.min)
  ORDER BY e.seq
)
SELECT
  s.receiver_id,
  s.sender_id,
  (
   CASE (RANDOM() * 2)::INT
     WHEN 0 THEN true
     WHEN 1 THEN true
     WHEN 2 THEN false
   END
 ) AS accepted
FROM shuffled s;
​
DELETE FROM friendships WHERE sender_id = receiver_id;
DELETE * FROM users WHERE id = $1
​
SELECT * FROM friendships ORDER BY sender_id ASC;

SELECT * FROM friendships
WHERE receiver_id = 5
OR sender_id = 5



UPDATE messages SET message='This is a test message to test messages', sender_id=1 RETURNING id;
INSERT INTO messages (message, sender_id) VALUES ('This is a test message to test messages', 1) RETURNING id;

SELECT * FROM messages ORDER BY posted_at DESC LIMIT 10;

SELECT users.id, users.first, users.last, users.url, messages.id, messages.sender_id, messages.message, messages.posted_at
FROM messages
JOIN users
ON sender_id = users.id
