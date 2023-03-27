import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import axios from 'axios';

function Game() {
  const [getLyrics, setGetLyrics] = useState([]);
  const [inputVal, setInputVal] = useState([]);
  const [songInput, setSongInput] = useState([]);
  const [artistInput, setArtistInput] = useState([]);
  const [idInput, setIdInput] = useState([]);
  const [dataName, setDataName] = useState([]);
  function addSong() {}
  // useEffect(()=> {
  //   axios.post('}/{trackId', {
  //     trackId: {trackId}
  //   })
  //   .then(data => console.log(data))
  //   .then(console.log('within post request on front end'))
  //   .catch(err => console.log(err))

  function addSong() {
    axios.post('https://localhost:5001/api/lyricsapi', {
      songname: songInput,
      artist: artistInput,
      trackId: idInput,
    });
  }
  function randomizeTrack() {
    //   const trackId = Math.floor(Math.random() * 15);
    //   axios.post('/{trackId}', {
    //     trackId: trackId
    //   })
    //   .then(data => console.log(data))
    //   .then(console.log('within post request on front end')) //setName
    //   .catch(err => console.log(err))
  }
  //create key for input song name
  function compareAnswer() {
    // if (songname === inputVal) return (
    //   alert('Correct')
    // );  //render something
    // else return (
    //   alert('Incorrect!')
    // );
  }
  return (
    <div>
      <Navbar />
      <div className='contentBox'>
        <h1>Play</h1>
        <div className='gameContent'>
          <div className='lyrics'>
            <button onClick={randomizeTrack}>Generate Lyrics</button>
            <div>
              {dataName.length > 0 ? <p>{dataName}</p> : <p>Lyrics go here</p>}
            </div>
          </div>
          <form onSubmit={compareAnswer}>
            <input
              type='text'
              name='guess'
              value={inputVal}
              onChange={(e) => {
                setInputVal(e.target.value);
              }}
            />
            <button type='submit'>Guess</button>
          </form>{' '}
          <br />
          <form>
            <input
              type='text'
              name='addsong'
              value={songInput}
              onChange={(e) => {
                setSongInput(e.target.value);
              }}
            />
            <input
              type='text'
              name='addartist'
              value={artistInput}
              onChange={(e) => {
                setArtistInput(e.target.value);
              }}
            />
            <input
              type='text'
              name='addid'
              value={idInput}
              onChange={(e) => {
                setIdInput(e.target.value);
              }}
            />
            <button onClick={addSong}>Add song</button>
          </form>
          <button onClick={() => console.log(songInput)}>SONG</button>
        </div>
      </div>
    </div>
  );
}

export default Game;
