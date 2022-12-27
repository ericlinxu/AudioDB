import React, { useState } from "react";
import "./DailySongs.css";
import { getDaily } from "../utils/apiWrapper";

import {
  Button
} from "reactstrap";

export default function DailySongs() {
    const [results, setResults] = useState(false);
    const [songs, setSongs] = useState([]);

  const search = async () => {
    const resp = await getDaily();
    if (!resp.error) {
      console.log(resp.data);
      setResults(true);
      setSongs(resp.data)
    }
  }

//   const favoriteSong = async (songID) => {
//     const resp = await canFavorite(userID, songID);
//     if(resp.error) {
//       console.log("error")
//     } else {
//       console.log(resp.data);
//     }
//     let run = "not run";
//     if (resp.data[0]["valid"] === 0) {
//       run = "run";
//       const resp1 = await addFavorite(userID, songID);
//       if(resp1.error) {
//         console.log("error")
//       } else {
//         console.log("added");
//       }
//     }
//     console.log(run);
//   }

//   const followArtist = async (artistID) => {
//     const resp = await canFollow(userID, artistID);
//     if(resp.error) {
//       console.log("error")
//     } else {
//       console.log(resp.data);
//     }
//     let run = "not run";
//     if (resp.data[0]["valid"] === 0) {
//       run = "run";
//       const resp1 = await addFollow(userID, artistID);
//       if(resp1.error) {
//         console.log("error")
//       } else {
//         console.log("added");
//       }
//     }
//     console.log(run);
//   }

  return (
  <>
    <div className="Daily">
    <br></br>
    <br></br>
    <Button
        onClick={search}
        className="search"
        style={{marginBottom: 8}}
        >
        Show Daily Songs
    </Button>
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
                  </tr>
                </table>
                </div>
            )})}
          </div>
          :
          <div>
            
          </div>
        }
    </div>
  </>
  );
}