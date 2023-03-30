import React from 'react';
import './assets/styles.scss';
import { Link } from 'react-router-dom';
import logo from './assets/music-logo.png';
import './assets/music-logo.png';
import Cookies from 'js-cookie';

function Navbar() {
  const cookie = Cookies.get('loggedIn');
  return (
    <div
      className="buttons"
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '10vh',
        width: '100%',
        backgroundColor: '#000000',
        textDecoration: 'none',
      }}
    >
      <div
        className="leftbuttons"
        style={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <button>
          <Link style={{ textDecoration: 'none', color: 'white' }} to="/about">
            About Us
          </Link>
        </button>
        {/* <button>
          <Link style={{ textDecoration: 'none', color: 'white' }} to="/rules">
            Rules
          </Link>
        </button> */}
        <button>
          <Link style={{ textDecoration: 'none', color: 'white' }} to="/">
            Home
          </Link>
        </button>
      </div>
      <div className="logo">
        <img src={logo} alt="logo" style={{ height: '100%' }} />
      </div>
      <div
        className="leftbuttons"
        style={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <button>
          <Link style={{ textDecoration: 'none', color: 'white' }} to="/rules">
            Rules
          </Link>
        </button>
        {cookie ? (
          <button className="playbutton">
            <Link style={{ textDecoration: 'none', color: 'white' }} to="/play">
              Play Now!
            </Link>
          </button>
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
}

export default Navbar;
