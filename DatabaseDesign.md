# Database Design

### Terminal Information

<img width="1214" alt="Screen Shot 2022-03-11 at 7 57 47 PM" src="https://media.github-dev.cs.illinois.edu/user/9068/files/ea05bd71-e113-4467-93ae-0f8cf32b1ae2">

### DDL Commands

```
CREATE TABLE User (
	userID INT PRIMARY KEY,
	password VARCHAR(255),
	name VARCHAR(255)
);

CREATE TABLE Song (
	id VARCHAR(255),
	uri VARCHAR(255),
	duration_ms VARCHAR(10),
	albumid VARCHAR(255),
	artists0id VARCHAR(255),
	name VARCHAR(255),
	PRIMARY KEY(id, albumid, artists0id),
	FOREIGN KEY (albumid) REFERENCES Album(albumid), 
	FOREIGN KEY (artists0id) REFERENCES Artist(artists0id)
);

CREATE TABLE Genre (
	genreName VARCHAR(255) PRIMARY KEY,
	weatherName VARCHAR(255),
	moodName VARCHAR(255)
);

CREATE TABLE ArtistBelongsToGenre (
	artists0id VARCHAR(255),
	genreName VARCHAR(255),
	PRIMARY KEY(artists0id,genreName),
	FOREIGN KEY (artists0id) REFERENCES Artist(artists0id), 
	FOREIGN KEY (genreName) REFERENCES Genre(genreName)
);

CREATE TABLE Album (
	albumid VARCHAR(255) PRIMARY KEY,
	albumname VARCHAR(255)
);

CREATE TABLE Artist (
	artists0id VARCHAR(255) PRIMARY KEY,
	artists0name VARCHAR(255)
);

CREATE TABLE UserFavoritesSong (
	userID INT,
	id VARCHAR(255),
	PRIMARY KEY (userID,id),
	FOREIGN KEY (userID) REFERENCES User(userID),
	FOREIGN KEY (id) REFERENCES Song(id)
);

CREATE TABLE UserFollowsArtist (
	artists0id VARCHAR(255),
	userID INT,
	PRIMARY KEY (artists0id, userID),
	FOREIGN KEY (artists0id) REFERENCES Artist(artists0id), 
	FOREIGN KEY (userID) REFERENCES User(userID) 
);
```

### Tables

<img width="172" alt="Screen Shot 2022-03-11 at 7 11 22 PM" src="https://media.github-dev.cs.illinois.edu/user/9068/files/910e8c84-b633-4503-b1d9-0deed20ccbab">

##### Table Row Counts

Song Table:

<img width="231" alt="Screen Shot 2022-03-11 at 7 14 26 PM" src="https://media.github-dev.cs.illinois.edu/user/9068/files/dabf4695-b150-4887-9b51-c7c1a54b6605">

Album Table:

<img width="236" alt="Screen Shot 2022-03-11 at 7 15 01 PM" src="https://media.github-dev.cs.illinois.edu/user/9068/files/1f5525e7-81cf-48d2-9132-ff3450011cea">

Artist Table:

<img width="246" alt="Screen Shot 2022-03-11 at 7 15 32 PM" src="https://media.github-dev.cs.illinois.edu/user/9068/files/078d968a-bfc9-4ff5-bfc3-ae1dccf258c0">

Genre Table:

<img width="238" alt="Screen Shot 2022-03-11 at 7 16 00 PM" src="https://media.github-dev.cs.illinois.edu/user/9068/files/c2ea33b0-22fe-4424-8fa5-51ad14ac433c">

User Table:

<img width="230" alt="Screen Shot 2022-03-11 at 7 16 29 PM" src="https://media.github-dev.cs.illinois.edu/user/9068/files/3447baff-e4dd-43e1-857f-ea4609bd2e0b">

UserFavoritesSong Table:

<img width="318" alt="Screen Shot 2022-03-11 at 7 17 08 PM" src="https://media.github-dev.cs.illinois.edu/user/9068/files/27f957cc-933e-4d67-ae4e-892f48a0930b">

ArtistBelongToGenre Table:

<img width="339" alt="Screen Shot 2022-03-11 at 7 17 54 PM" src="https://media.github-dev.cs.illinois.edu/user/9068/files/72e9c5d5-ce27-4072-9feb-7ab9a1d2bbde">

UserFollowsArtist Table:

<img width="314" alt="Screen Shot 2022-03-19 at 2 15 54 PM" src="https://media.github-dev.cs.illinois.edu/user/9068/files/75c3be50-c406-451f-a213-b3372d8fafd5">

### Advanced Queries

#### Discover Query

The Discover Query outputs a list of songs represented by the Song Name, Song Duration, Album Name, Artist Name, and URI depending the user input.

In the first WHERE clause, the "%hi%" can be replaced by whatever the user types into the search bar.

In the third WHERE clause, the genreName, moodName, and weatherName can be replaced with whatever choice the user makes.

```
(SELECT s.name, s.duration_ms, alb.albumname, art.artists0name, s.uri  
 FROM Song s NATURAL JOIN Album alb NATURAL JOIN Artist art 
 WHERE s.name LIKE "%hi%") 
UNION 
(SELECT name, duration_ms, albumname, artists0name, uri  
 FROM Song NATURAL JOIN Album NATURAL JOIN Artist 
 WHERE artists0id IN (SELECT artists0id 
                      FROM ArtistBelongsToGenre NATURAL JOIN Genre 
		      WHERE genreName = “pop" OR moodName = "sad" OR weatherName = "cloudy")) 
ORDER BY name;
```

Discover Query Output:

<img width="1423" alt="Screen Shot 2022-03-11 at 6 58 53 PM" src="https://media.github-dev.cs.illinois.edu/user/9068/files/6f81b5c2-a2ee-45ba-a621-3dc2e8022163">

#### Recommendation Query

The Recommendation Query outputs a list of songs represented by the Song Name, Song Duration, Album Name, Artist Name, and URI depending on 2 users' favorites playlist.

In the subquery's WHERE clause, the two userID values can be replaced by different userID values.

```
SELECT DISTINCT s.name, s.duration_ms, alb.albumname, art.artists0name, s.uri
FROM ArtistBelongsToGenre as abg NATURAL JOIN 
(SELECT DISTINCT abg1.genreName 
 FROM UserFavoritesSong AS ufs NATURAL JOIN Song AS s1 NATURAL JOIN ArtistBelongsToGenre AS abg1 
 WHERE ufs.userID = 0 OR ufs.userID = 1) AS u
NATURAL JOIN Song AS s NATURAL JOIN Album AS alb NATURAL JOIN Artist AS art
ORDER BY s.uri;
```

Reccomendation Query Output:

<img width="1426" alt="Screen Shot 2022-03-11 at 7 01 36 PM" src="https://media.github-dev.cs.illinois.edu/user/9068/files/56b3bba3-acb4-4d47-9c2c-581001eb0dd3">

### Indexing Analysis

#### Discover Query

No Index:

<img width="1338" alt="Screen Shot 2022-03-11 at 7 53 07 PM" src="https://media.github-dev.cs.illinois.edu/user/9068/files/1baa5333-bb8c-4d8b-909b-7371390bb49b">

Creating Song Name index:

<img width="1325" alt="Screen Shot 2022-03-11 at 7 54 12 PM" src="https://media.github-dev.cs.illinois.edu/user/9068/files/62e61a2a-d31d-48a8-a7ce-08a25c65fd50">

Time goes up in this instance since reading the index takes more time. The database must look at more options. The number of expected values returned by the query is approximately the same number of rows for this query, thereby causing overhead.

Creating Album Name index:

<img width="1341" alt="Screen Shot 2022-03-11 at 7 42 55 PM" src="https://media.github-dev.cs.illinois.edu/user/9068/files/60696624-29c7-4fc4-89d6-5775664eeaf3">

No noticeable performance improvement.

Creating Artist Name index:

<img width="1341" alt="Screen Shot 2022-03-11 at 7 43 29 PM" src="https://media.github-dev.cs.illinois.edu/user/9068/files/ebc746a2-5b46-42fe-bec8-9c4909eb514e">

No noticeable performance improvement.

Creating Artist Name, Album Name, and Song Name index:

<img width="1123" alt="Screen Shot 2022-03-11 at 7 44 42 PM" src="https://media.github-dev.cs.illinois.edu/user/9068/files/aa128a78-f8ec-4615-b8e1-4316cbc80993">

No noticeable performance improvement. The indices provided offer no additional cost or time decrease since the query with this index design is approximately the same number of rows compared to no index design.

Creating Song Name, Weather Name, and Mood Name index: **(We chose to use this index design)**

<img width="1122" alt="Screen Shot 2022-03-11 at 7 45 32 PM" src="https://media.github-dev.cs.illinois.edu/user/9068/files/52538233-db35-4e0a-8fc3-7b3f45b48f60">

After exploring different combinations of index designs to different attributes on our advanced query, we decided to choose the combination of adding songname, weathername, and moodname indices to reduce the time and cost of our query. Prior to adding any indices, our cost for song, artist, and album lookup was 315.17, 61.40, and 139.05, respectively. After adding the songname, weathername, and moodname indices, our cost was reduced to 38.19, 7.44, and 16.80, respectively. 

We decided to define this index design based on two reasons: 1) if the WHERE clause is not on a primary key, and 2) if we are joining tables on a non-primary key. We explored many other index combinations, and they produced no significant increase in performance. However, after inserting the songname, weathername, and moodname indices, we notice a jump in performance.

#### Recommendation Query

No Index:

<img width="1331" alt="Screen Shot 2022-03-11 at 7 48 18 PM" src="https://media.github-dev.cs.illinois.edu/user/9068/files/5231e0f7-b949-48d9-9722-9caf7e71a2c5">

Creating Genre Name index:

<img width="1337" alt="Screen Shot 2022-03-11 at 7 48 48 PM" src="https://media.github-dev.cs.illinois.edu/user/9068/files/6982a032-c31c-4fb0-9db1-bd58ab35be90">

No noticeable performance improvement.

Creating Genre Name and UserID index:

<img width="1331" alt="Screen Shot 2022-03-11 at 7 49 36 PM" src="https://media.github-dev.cs.illinois.edu/user/9068/files/e0511423-d3a6-4c7c-8081-903e52e40d4c">

No noticeable performance improvement.

Creating Genre Name, UserID, and Song URI index:

<img width="1332" alt="Screen Shot 2022-03-11 at 7 50 33 PM" src="https://media.github-dev.cs.illinois.edu/user/9068/files/0d84bc36-6d41-4ce3-90f2-4cf588c4df43">

No noticeable performance improvement.

**We chose to keep the no indexing design**

After exploring a few index designs, we come to the conclusion that no significant performance improvement can be achieved. With no index design, our time and cost is already quite low due to the lack of non-primary key attributes in our join tables or WHERE clauses. As a result, the queries resulting from adding additional index designs serve no significant performance improvement.
