import React, { useState, useEffect } from 'react';
import DisplayPlayer from './DisplayPlayer';

function Leaderboard({ users }) {
      const userCreate = Object.keys(users).map(user => {
         return (
           <DisplayPlayer name = {user} score = {users[user]} />
         )
      })
     
    return (
      <div>
          <div>{userCreate}</div>
  
      </div>
    );
}

export default Leaderboard;
