import React, { useState, useEffect } from "react";
import { getSongFavorites, getArtistFollows, getDeleteFollow, getDeleteFavorite, getProbabilityDistri, getStat } from "../utils/apiWrapper";
import { useParams } from 'react-router-dom';
import "./Home.css";
import { PieChart, Pie, Cell, Tooltip, Legend} from 'recharts';

import {
  Button,
} from "reactstrap";

export default function Home() {
  const [songs, setSongs] = useState([]);
  const [artists, setArtists] = useState([]);
  const [results, setResults] = useState(false);
  const[probabilityDist, setProbabilityDist] = useState([]);
  const [status, setStatus] = useState("");
  const { userID } = useParams();

  useEffect(() => {
    if (userID) {
      setResults(true);
    }
  }, [userID])
  console.log(userID);

  const songFavorites = async () => {
    const resp = await getSongFavorites(userID);
    if (!resp.error) {
      console.log(resp.data);
      setSongs(resp.data);
    }
  }

  const artistFollows = async () => {
    const resp = await getArtistFollows(userID);
    if (!resp.error) {
      console.log(resp.data);
      setArtists(resp.data);
    }
  }

  const deleteFavorite = async (songID) => {
    const resp = await getDeleteFavorite(userID, songID);
    if (!resp.error) {
      console.log(resp.data);
    }
  }

  const deleteFollow = async (artistID) => {
    const resp = await getDeleteFollow(userID, artistID);
    if (!resp.error) {
      console.log(resp.data);
    }
  }

  const probabilityDistri = async () => {
    const resp = await getProbabilityDistri(userID);
    if (!resp.error) {
      console.log(resp.data);
      setProbabilityDist(resp.data);
    }
  }

  function generateRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  
  // data filled in for the pie chart
  let data = [];
  probabilityDist.map((pd) => {
    data.push({name: pd.genreName, value: pd.probabilityDist * 100, fill: generateRandomColor()});
    return "";
  })

  const CustomTooltip = ({ active, payload, label }) => {
    if (active) {
      return (
        <div className="custom-tooltip" style={{ backgroundColor: '#ffff', padding: '5px', border: '1px solid #cccc' }}>
            <label>{`${payload[0].name} : ${(payload[0].value).toFixed(0)}%`}</label>
        </div>
      );
    }
    return null;
  }

  const showStat = async () => {
    const resp = await getStat(userID);
    if (!resp.error) {
      console.log(resp.data[0]);
      setStatus(resp.data[0]);
    }
  }

  return (
    <>
      <div className="Home">
        <Button
          onClick={showStat}
          className="userStat"
          style={{ marginBottom: 8 }}
          >
          Show Status
        </Button>
        <Button
          onClick={songFavorites}
          className="songFavorites"
          style={{ marginBottom: 8 }}
          >
          Show Favorite Songs
        </Button>
        <Button
          onClick={artistFollows}
          className="artistFollows"
          style={{ marginBottom: 8 }}
          >
          Show Artists You Follow
        </Button>
        <Button
         onClick={probabilityDistri}
         className="probabilityDist"
         style={{ marginBottom: 8 }}
         >
         Probability Distribution
       </Button>
       {results ?
         <><div>
           <p>My Status: {status.status}</p>
           <p>My Favorite Songs:</p>
           {songs.map((song) => {
             return (
               <div key={song.id}>
                <br></br>

                <table>
                  <tr>
                    <td><p>Song: {song.name}</p></td>
                    <td><p>Duration: {song.duration_ms}</p></td>
                    <td><p>Album: {song.albumname}</p></td>
                    <td><p>Artist: {song.artists0name}</p></td>
                    <td><Button
                      onClick={()=>deleteFavorite(song.id)}
                      className="deleteFavorite"
                      style={{marginBottom: 8}}
                      >
                      Remove Song
                    </Button></td>
                  </tr>
                </table>
              </div>
             );
           })}
         </div><div>
               <p>My Favorite Artists:</p>
               {artists.map((artist) => {
                 return (
                   <div key={artist.artists0id}>
                    <br></br>
                     
                    <table>
                       <tr>
                        <td><p>Name: {artist.artists0name}</p></td>
                        <td><Button
                          onClick={()=>deleteFollow(artist.artists0id)}
                          className="deleteFollow"
                          style={{marginBottom: 8}}
                          >
                          Remove Artist
                        </Button></td>
                      </tr>
                    </table>
                  </div>
                 );
               })}
             </div>
             <p>Probability Distribution:</p>
             <div class = "center">
                <PieChart width={730} height={450}>
                  <Pie data={data} color="#000000" dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={120} fill="#8884d8" >
                      {data.map((entry, index) => <Cell key={`cell-${index}`} fill={generateRandomColor()} />)}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                </PieChart>
                </div>
              </>
         :
         <div>
           <p>Please Login :(</p>
         </div>
       }
     </div>
   </>
 );
}