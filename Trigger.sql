CREATE TRIGGER statadd 
AFTER INSERT ON UserFavoritesSong FOR EACH ROW
BEGIN
    SET @numFavs = (SELECT COUNT(*) FROM UserFavoritesSong WHERE userID = new.userID);
    SET @stat = "Newbie Listener";
    IF @numFavs >= 5 THEN
        SET @stat = "Beginner Listener";
    END IF;
    IF @numFavs >= 10 THEN
        SET @stat = "Intermediate Listener";
    END IF;
    IF @numFavs >= 20 THEN
        SET @stat = "Advanced Listener";
    END IF;
    IF @numFavs >= 40 THEN
        SET @stat = "Expert Listener";
    END IF;

    UPDATE User
    SET status = @stat
    WHERE userID = new.userID;
END;
//
CREATE TRIGGER statdel 
AFTER DELETE ON UserFavoritesSong FOR EACH ROW
BEGIN
    SET @numFavs = (SELECT COUNT(*) FROM UserFavoritesSong WHERE userID = old.userID);
    SET @stat = "Newbie Listener";
    IF @numFavs >= 5 THEN
        SET @stat = "Beginner Listener";
    END IF;
    IF @numFavs >= 10 THEN
        SET @stat = "Intermediate Listener";
    END IF;
    IF @numFavs >= 20 THEN
        SET @stat = "Advanced Listener";
    END IF;
    IF @numFavs >= 40 THEN
        SET @stat = "Expert Listener";
    END IF;

    UPDATE User
    SET status = @stat
    WHERE userID = old.userID;
END;
//