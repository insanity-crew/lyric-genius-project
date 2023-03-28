import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import Popup from 'reactjs-popup';


function Game() {
  const [getLyrics, setGetLyrics] = useState("");
  const [inputVal, setInputVal] = useState("");
  const [songInput, setSongInput] = useState("");
  const [artistInput, setArtistInput] = useState("");
  const [idInput, setIdInput] = useState("");
  const [dataName, setDataName] = useState("");
  const [lyrics, setLyrics] = useState("");
  const [equal, setEqual] = useState(false);
  const [winner, setWinner] = useState("");
  useEffect(() => {
    if (dataName === inputVal) {
      setWinner(true)
    } else {
      setWinner(false)
    }
  })
  
  async function addSong() {
    await axios.post("https://localhost:5001/api/lyricsapi", {
      name: songInput,
      artist: artistInput,
      trackId: idInput,
    });
  }
  async function randomizeTrack() {
    console.log("in randomize track");
    const newTrackId = Math.floor(Math.random() * 15);
    console.log(newTrackId);
    try {
      const response = await axios.get(`/api/${newTrackId}`, {
        trackId: newTrackId,
      })
      console.log('this is response data', response.data)
      //console.log(response.data.lyrics)
      setLyrics(response.data.lyrics)
      setDataName(response.data.name)
    } catch (err) {
      console.error("error", err);
    }
  }
  //create key for input song name
  function compareAnswer(event) {
    event.preventDefault();
    setEqual(false)
    if (dataName === inputVal) {
      alert('Correct!');
      return randomizeTrack();
    }
    else alert('Incorrect!')//render something
  }
  
  return (
    <div>
      <Navbar />
      <div className='contentBox'>
        <h1>Play</h1>
        <div>
        </div>
        <div className="gameContent">
          <div className="lyrics" style={{width: '75%'}}>
            <button onClick={randomizeTrack}>Generate Lyrics</button>
            <div>
              {lyrics.length > 0 ? <div style={{'overflowY': 'scroll', height: '400px', fontSize: '28px', color: 'black', width: "800px"}}>{lyrics.split('\n').map((line, index) => (
                    <React.Fragment key={index}>
                      <span>{line}</span>
                      <br />
                    </React.Fragment>
                  ))}</div> : <p>Lyrics go here</p>}
            </div>
          </div>
          <form onSubmit={compareAnswer}>
            <input
              type="text"
              name="guess"
              value={inputVal}
              onChange={(e) => {
                setInputVal(e.target.value);
              }}
            />
              <button type="submit">Guess</button>
          </form>{" "}
          <br />
        </div>
      </div>
    </div>
  );
}

export default Game;
/*<div>
      <Navbar />
      <div className='contentBox'>
        <h1>Play</h1>
        <div>
        </div>
        <div className="gameContent">
          <div className="lyrics" style={{width: '75%'}}>
            <button onClick={randomizeTrack}>Generate Lyrics</button>
            <div>
              {lyrics.length > 0 ? <div style={{'overflowY': 'scroll', height: '400px'}}><p>{lyrics}</p></div>: <p>Lyrics go here</p>}
            </div>
          </div>
          <form onSubmit={compareAnswer}>
            <input
              type="text"
              name="guess"
              value={inputVal}
              onChange={(e) => {
                setInputVal(e.target.value);
              }}
            />
              <button type="submit">Guess</button>
          </form>{" "}
          <br />
        </div>
      </div>
    </div> */