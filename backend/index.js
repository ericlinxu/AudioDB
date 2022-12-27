const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require('cors')
app.use(cors())
app.use(express.json())

var db = mysql.createConnection({
    host:'34.66.98.219',
    user: 'root',
    password:'audiodb',
    database:'AudioDB'
});

db.connect((err) => {
    if (err) {
        throw err
    }
    console.log("Connected to MySQL...")
})

app.listen(9000, () => {
    console.log("running on port 9000");
})

app.get('/api/v1/discover', (req, res) => {
    let keyword = req.query.keyword; // retrieve queries from URI 
    let genre = req.query.genre;
    let mood = req.query.mood;
    let weather = req.query.weather;
    let query = `SELECT s.name, s.duration_ms, alb.albumname, art.artists0name, s.uri, s.id, art.artists0id
        FROM Song s NATURAL JOIN Album alb NATURAL JOIN Artist art 
        WHERE s.name LIKE "%${keyword}%" OR art.artists0id IN 
                            (SELECT artists0id 
                             FROM ArtistBelongsToGenre NATURAL JOIN Genre 
                             WHERE genreName = "${genre}" OR moodName = "${mood}" OR weatherName = "${weather}")
       ORDER BY s.name LIMIT 20;`;
    db.query(query, function(err, result) {
        if (err) throw err;
        res.send(result);
    });
})

app.post('/api/v1/addFavorite', (req, res) => {
    let userID = req.query.userID; // retrieve queries from URI 
    let songID = req.query.songID;
    let query = `INSERT INTO UserFavoritesSong (userID,id) VALUES (` + userID + `,'` + songID + `');`;
    db.query(query, function(err, result) {
        if (err) throw err;
        res.send(result);
    });
})

app.get('/api/v1/canFavorite', (req, res) => {
    let userID = req.query.userID; // retrieve queries from URI 
    let songID = req.query.songID;
    let query = `SELECT COUNT(*) AS valid FROM UserFavoritesSong WHERE userID = "` + userID + `" AND id = "` + songID + `";`;
    db.query(query, function(err, result) {
        if (err) throw err;
        res.send(result);
    });
})

app.post('/api/v1/addFollow', (req, res) => {
    let userID = req.query.userID; // retrieve queries from URI 
    let artistID = req.query.artistID;
    let query = `INSERT INTO UserFollowsArtist (userID,artists0id) VALUES (` + userID + `,'` + artistID + `');`;
    db.query(query, function(err, result) {
        if (err) throw err;
        res.send(result);
    });
})

app.get('/api/v1/canFollow', (req, res) => {
    let userID = req.query.userID; // retrieve queries from URI 
    let artistID = req.query.artistID;
    let query = `SELECT COUNT(*) AS valid FROM UserFollowsArtist WHERE userID = "` + userID + `" AND artists0id = "` + artistID + `";`;
    db.query(query, function(err, result) {
        if (err) throw err;
        res.send(result);
    });
})

app.get('/api/v1/recommend', (req, res) => {
    let userID = req.query.userID; // retrieve queries from URI 
    let compareID = req.query.compareID;
    let query = `SELECT DISTINCT s.name, s.duration_ms, alb.albumname, art.artists0name, s.uri, s.id, art.artists0id
                FROM ArtistBelongsToGenre as abg NATURAL JOIN 
                (SELECT DISTINCT abg1.genreName 
                FROM UserFavoritesSong AS ufs NATURAL JOIN Song AS s1 NATURAL JOIN ArtistBelongsToGenre AS abg1 
                WHERE ufs.userID = "${userID}" OR ufs.userID = "${compareID}") AS u
                NATURAL JOIN Song AS s NATURAL JOIN Album AS alb NATURAL JOIN Artist AS art
                ORDER BY s.uri LIMIT 10;`;
    db.query(query, function(err, result) {
        if (err) throw err;
        res.send(result);
    });
})

app.get('/api/v1/getUser', (req, res) => {
    let password = req.query.password;
    let userID = req.query.userID;
    let query = 'SELECT count(userId) AS isValid FROM User WHERE userID = "' + userID + '" AND password = "' + password + '";';
    db.query(query, function (err, result) {
        if (err) throw err;
        res.send(result);
    });
})

app.get('/api/v1/getSongFavorites', (req, res) => {
    let userID = req.query.userID;
    let query = `SELECT s.name, s.duration_ms, alb.albumname, art.artists0name, s.uri, ids.id
                 FROM (SELECT ufs.id FROM UserFavoritesSong ufs WHERE ufs.userID = "` + userID + `") AS ids NATURAL JOIN Song s NATURAL JOIN Album alb NATURAL JOIN Artist art;`;
    db.query(query, function (err, result) {
        if (err) throw err;
        res.send(result);
    });
})

app.get('/api/v1/getArtistFollows', (req, res) => {
    let userID = req.query.userID;
    let query = 'SELECT a.artists0name, a.artists0id FROM (SELECT artists0id FROM UserFollowsArtist ufa WHERE ufa.userID = "' + userID + '") AS ids NATURAL JOIN Artist a;';
    db.query(query, function (err, result) {
        if (err) throw err;
        res.send(result);
    });
})

app.delete('/api/v1/deleteFavorite', (req, res) => {
    let songID = req.query.songID;
    let userID = req.query.userID;
    let query = 'DELETE FROM UserFavoritesSong WHERE id = "' + songID + '" AND userID = "' + userID + '";';
    db.query(query, function (err, result) {
        if (err) throw err;
        res.send(result);
    });
})

app.delete('/api/v1/deleteFollow', (req, res) => {
    let artistID = req.query.artistID;
    let userID = req.query.userID;
    let query = 'DELETE FROM UserFollowsArtist WHERE artists0id = "' + artistID + '" AND userID = "' + userID + '";';
    db.query(query, function (err, result) {
        if (err) throw err;
        res.send(result);
    });
})

app.get('/api/v1/getID', (req, res) => {
    let query = 'SELECT (MAX(userID) + 1) AS uID FROM User;';
    db.query(query, function (err, result) {
        if (err) throw err;
        res.send(result);
    });
})

app.post('/api/v1/createAccount', (req, res) => {
    let userID = req.query.userID; // retrieve queries from URI 
    let password = req.query.password;
    let query = `INSERT INTO User (userID,password,name,status) VALUES ('${userID}','${password}','123','Newbie Listener');`;
    db.query(query, function(err, result) {
        if (err) throw err;
        res.send(result);
    });
})

app.get('/api/v1/validUser', (req, res) => {
    let userID = req.query.userID; // retrieve queries from URI 
    let password = req.query.password;
    let query = 'SELECT COUNT(*) AS valid FROM User WHERE userID = "' + userID + '" AND password = "' + password + '";';
    db.query(query, function(err, result) {
        if (err) throw err;
        res.send(result);
    });
})

app.put('/api/v1/updatePassword', (req, res) => {
    let userID = req.query.userID; // retrieve queries from URI 
    let password = req.query.password;
    let query = 'UPDATE User SET password = "' + password + '" WHERE userID = "' + userID + '";';
    db.query(query, function(err, result) {
        if (err) throw err;
        res.send(result);
    });
})

app.get('/api/v1/getDaily', (req, res) => {
    let query = 'CALL daily();';
    db.query(query, function(err, result) {
        if (err) throw err;
        res.send(result[0]);
    });
})

app.get('/api/v1/probabilityDistri', (req, res) => {
    let userID = req.query.userID; // retrieve queries from URI
    let query = 'select genreName, count/total as probabilityDist from(select genreName, count(genreName) as count from (select genreName from ArtistBelongsToGenre where artists0id in (select artists0id from Song where id in (select id from UserFavoritesSong where userID =' + userID + '))) as temp group by genreName) as temp1 join (select count(*) as total from (select genreName from ArtistBelongsToGenre where artists0id in (select artists0id from Song where id in (select id from UserFavoritesSong where userID ='+ userID +')))as temp2) as temp3;';
    db.query(query, function(err, result) {
        if (err) throw err;
        res.send(result);
    });
 })

 app.get('/api/v1/getStat', (req, res) => {
    let query = `SELECT status FROM User WHERE userID = "${req.query.userID}";`;
    db.query(query, function(err, result) {
        if (err) throw err;
        res.send(result);
    });
})
