import React from 'react';

function DisplayPlayer({ name, score }) {
  return (
    <div className="display-player">
      <span className="player-name">{name}</span>
      <span className="player-score">{score}</span>
    </div>
  );
}

export default DisplayPlayer;