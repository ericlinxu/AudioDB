import React, { useState } from "react";
import "./Recommend.css";
import { getRecommend, addFavorite, canFavorite, canFollow, addFollow } from "../utils/apiWrapper";

import {
  Button,
  Form,
  FormGroup,
  Input
} from "reactstrap";

export default function Recommend() {
  const [userID, setUserID] = useState("");
  const [compareID, setCompareID] = useState("");
  const [results, setResults] = useState(false);
  const [songs, setSongs] = useState([]);

  const search = async () => {
    const resp = await getRecommend(userID, compareID);
    if(resp.error) {
      console.log("error")
    } else {
      console.log(resp.data);
      setResults(true);
      setSongs(resp.data);
    }
  }

  const favoriteSong = async (songID) => {
    const resp = await canFavorite(userID, songID);
    if(resp.error) {
      console.log("error")
    } else {
      console.log(resp.data);
    }
    let run = "not run";
    if (resp.data[0]["valid"] === 0) {
      run = "run";
      const resp1 = await addFavorite(userID, songID);
      if(resp1.error) {
        console.log("error")
      } else {
        console.log("added");
      }
    }
    console.log(run);
  }

  const followArtist = async (artistID) => {
    const resp = await canFollow(userID, artistID);
    if(resp.error) {
      console.log("error")
    } else {
      console.log(resp.data);
    }
    let run = "not run";
    if (resp.data[0]["valid"] === 0) {
      run = "run";
      const resp1 = await addFollow(userID, artistID);
      if(resp1.error) {
        console.log("error")
      } else {
        console.log("added");
      }
    }
    console.log(run);
  }

  return (
    <>
      <div className="Recommend">
      <h1 style={{color: "red", marginTop: "24vh"}}>Recommend</h1>
        {<div><Form>
          <FormGroup className="user-compare">
            <Input
                type="text"
                value={compareID}
                id="compareID"
                // placeholder="Enter the userID to Compare"
                placeholder = " "
                onChange={(e) => setCompareID(e.target.value)}
            />
            <Input
                type="text"
                value={userID}
                id="userID"
                // placeholder="Enter your userID"
                placeholder = " "
                onChange={(e) => setUserID(e.target.value)}
            />
            <label for = "yourInput" class = "form__input"> Enter your userID</label>
            <label for = "compareInput" class = "form__input"> Enter userID to compare</label>
          </FormGroup>
        </Form>
        <br></br>
        <Button
          onClick={search}
          className="Search"
          style={{marginBottom: 8}}
          >
          Search
        </Button></div>}
        {results ? 
          <div>
            <p>Results:</p>
            {songs.map((song) => { return (
              <div key = {song.id}>
                <br></br>
                <table>
                  <tr>
                    <td><p>Song: {song.name}</p></td>
                    <td> <p>Duration: {Math.round(song.duration_ms/1000/60)} min {Math.round(song.duration_ms/1000) % 60} sec</p> </td>
                    <td><p>Album: {song.albumname}</p></td>
                    <td><p>Artist: {song.artists0name}</p></td>
                    <td>{<Button
                      onClick={()=>favoriteSong(song.id)}
                      className="favoriteSong"
                      style={{marginBottom: 8}}
                      >
                      Add song to Favorites
                    </Button>}
                    <br></br>
                    {<Button
                      onClick={()=>followArtist(song.artists0id)}
                      className="followArtist"
                      style={{marginBottom: 8}}
                      >
                      Follow Artist
                    </Button>}</td>
                  </tr>
                </table>
              </div>
            )})}
          </div>
          : 
          <div>
            <p>No results found :(</p>
            <p>Please Search Again</p>
          </div>
        }
      </div>
    </>
  );
}