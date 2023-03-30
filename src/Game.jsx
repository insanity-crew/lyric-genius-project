import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import Popup from 'reactjs-popup';
import { io } from 'socket.io-client';
import Cookies from 'js-cookie';
import Leaderboard from './Leaderboard';

const socket = io('http://localhost:5001');

function Game() {
  const [getLyrics, setGetLyrics] = useState('');
  const [inputVal, setInputVal] = useState('');
  const [songInput, setSongInput] = useState('');
  const [artistInput, setArtistInput] = useState('');
  const [idInput, setIdInput] = useState('');
  const [dataName, setDataName] = useState('');
  const [lyrics, setLyrics] = useState('');
  const [equal, setEqual] = useState(false);
  const [winner, setWinner] = useState('');
  const [users, setUsers] = useState({});
  const [guesses, setGuesses] = useState([]);
  const [wrongGuess, setWrongGuess] = useState(false);
  const [showWinner, setShowWinner] = useState(false);

  const userCookie = Cookies.get('ssid');
  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to server', socket.id, 'in the frontend');

      if (userCookie)
        socket.emit('i_have_joined', { user_cookies: userCookie });
      socket.on('emmiting_to_users', (name) => {
        console.log('user connected ', name);
        console.log(users);
        setUsers(name);
        console.log('users,', users);
      });
    });

    socket.on('display_guess', (newGuess) => {
      console.log('this is guesses before', guesses);
      setGuesses(newGuess);
      // console.log('this is NEW guesses, ', newGuess);
      // console.log('this is guesses AFTER', guesses);

      // console.log('this is guesses username, ', guesses[0].username);
    });

    socket.on('get_lyrics_from_server', (lyrics) => {
      // lyrics are this object
      console.log('im here');
      // ANDRI and JAY: chenge this to state will update frontend for everyone (lyrics_objects is a string)
      console.log(lyrics, 'in frontend');
      setLyrics(lyrics);
      setShowWinner(false);
    });

    socket.on('you_guessed_wrong', () => {
      setWrongGuess(true);
      setTimeout(() => {
        setWrongGuess(false);
      }, 3000);
    });

    socket.on('display_winner', (winnerName) => {
      console.log('here come winner', winnerName);
      setShowWinner(true);
      setWinner(winnerName);
      console.log(winner);
    });
  }, []);

  async function addSong() {
    await axios.post('https://localhost:5001/api/lyricsapi', {
      name: songInput,
      artist: artistInput,
      trackId: idInput,
    });
  }

  async function getSongLyrics() {
    console.log('about to get lyrics');
    socket.emit('ready_to_play');
    // socket.on('get_lyrics_from_server', (obj) => {
    //   console.log('in function getsonglyrics');
    // });
  }
  async function randomizeTrack() {
    //const rnadomTrack = pick random number in songs database

    // socket.emit('ready_to_play', randomTrack)
    console.log('in randomize track');
    const newTrackId = Math.floor(Math.random() * 15);
    console.log(newTrackId);
    try {
      const response = await axios.get(`/api/${newTrackId}`, {
        trackId: newTrackId,
      });
      console.log('this is response data', response.data);
      //console.log(response.data.lyrics)
      setLyrics(response.data.lyrics);
      setDataName(response.data.name);
    } catch (err) {
      console.error('error', err);
    }
  }
  //create key for input song name
  function compareAnswer(event) {
    event.preventDefault();
    // setEqual(false);

    socket.emit('check_answer', { user_cookies: userCookie, guess: inputVal });

    console.log('Guesses:', guesses);
    setInputVal('');
    // return randomizeTrack();
  }

  return (
    <div>
      <Navbar />
      <div className="contentBox">
        {/* {wrongGuess && <h3>Wrong guess! Try again.</h3>} */}
        <div className="guessesBox">
          {wrongGuess && <h1>Wrong guess! Try again.</h1>}
          {showWinner && <h1>{winner} is the winner!</h1>}
        </div>
        <div className="gameWrapper">
          <div className="leaderboard">
            <Leaderboard users={users} />
          </div>
          <div className="gameContent">
            <div className="lyrics" style={{ width: '75%' }}>
              <button className="inside" onClick={getSongLyrics}>
                Generate Lyrics
              </button>
              <div>
                {lyrics.length > 0 ? (
                  <div
                    style={{
                      overflowY: 'scroll',
                      height: '400px',
                      fontSize: '28px',
                      color: 'white',
                      width: '500px',
                    }}
                  >
                    {lyrics.split('\n').map((line, index) => (
                      <React.Fragment key={index}>
                        <span>{line}</span>
                        <br />
                      </React.Fragment>
                    ))}
                  </div>
                ) : (
                  <p>Lyrics go here</p>
                )}
              </div>
            </div>
            <form onSubmit={compareAnswer}>
              <input
                id="guessInp"
                type="text"
                name="guess"
                value={inputVal}
                onChange={(e) => {
                  setInputVal(e.target.value);
                }}
              />
              <button className="inside" type="submit">
                Guess
              </button>
            </form>{' '}
            <br />
          </div>
          <div className="inputboard">
            {guesses.map((name) => (
              <div className="guesses">
                <span id="guess-name">{name.username}: </span>
                <span id="guess-text">{name.guess} </span>
              </div>
            ))}
          </div>
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
