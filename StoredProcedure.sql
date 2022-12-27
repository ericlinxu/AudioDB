CREATE PROCEDURE daily()
BEGIN
    DECLARE done int default 0;
    DECLARE genre VARCHAR(255);
    DECLARE topGenre VARCHAR(255);
    DECLARE artist VARCHAR(255);
    DECLARE genreCount INT;
    DECLARE artistCount INT;
    DECLARE genrecur CURSOR FOR (SELECT genreName, COUNT(*) AS c 
                                 FROM (SELECT DISTINCT ufs.id FROM UserFavoritesSong AS ufs) AS ds 
                                 NATURAL JOIN Song NATURAL JOIN ArtistBelongsToGenre
                                 GROUP BY genreName
                                 ORDER BY c DESC, genreName
                                 LIMIT 5);
    DECLARE artistcur CURSOR FOR (SELECT artists0id, COUNT(*) AS c 
                                  FROM UserFollowsArtist
                                  GROUP BY artists0id
                                  ORDER BY c DESC, artists0id
                                  LIMIT 5);
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;
    
    DROP TABLE IF EXISTS topArtists;
    CREATE TABLE topArtists (
        artists0id VARCHAR(255)
    );
    
    OPEN artistcur;
    BEGIN
        cloop: LOOP
        FETCH artistcur INTO artist, artistCount;
        IF done THEN 
            LEAVE cLoop;
        END IF;
        INSERT INTO topArtists VALUES(artist);
        END LOOP;
    END;
    CLOSE artistcur;
    
    DROP TABLE IF EXISTS topGenres;
    CREATE TABLE topGenres (
        genreName VARCHAR(255)
    );
    
    OPEN genrecur;
    BEGIN
        cloop: LOOP
        FETCH genrecur INTO genre, genreCount;
        IF done THEN 
            LEAVE cloop;
        END IF;
        INSERT INTO topGenres VALUES(genre);
        END LOOP;
    END;
    CLOSE genrecur;
        
    DROP TABLE IF EXISTS dailySongs;
    CREATE TABLE dailySongs (
        name VARCHAR(255),
        duration_ms VARCHAR(10),
        albumname VARCHAR(255),
        artists0name VARCHAR(255),
        uri VARCHAR(255),
        id VARCHAR(255),
        artists0id VARCHAR(255)
    );
    
    INSERT INTO dailySongs
    (SELECT DISTINCT name, duration_ms, albumname, artists0name, uri, id, artists0id
     FROM Song NATURAL JOIN Artist NATURAL JOIN Album NATURAL JOIN ArtistBelongsToGenre
     WHERE genreName IN (SELECT * FROM topGenres) OR artists0id IN (SELECT * FROM topArtists)
     ORDER BY name LIMIT 50);

    SELECT * FROM dailySongs;
END;