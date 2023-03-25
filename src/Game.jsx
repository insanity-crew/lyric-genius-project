import React from 'react'
import Navbar from './Navbar'

function Game() {
  return (
    <div>
    <Navbar />
        Game
        <p>Lyrics go here...</p>
        <form>
            <input type='text' />
        </form>
        <button>Guess</button>
    </div>
  )
}

export default Game