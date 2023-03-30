import React from 'react';
import Navbar from './Navbar';
import anna from './assets/anna.jpg';
import slava from './assets/slava.jpg';
import yining from './assets/yining.png';
import Jay from './assets/natalie.png';
import './assets/styles.scss';

function About() {
  return (
    <div>
      <Navbar />
      <div className="contentBox">
        <h1>About Us</h1>
        <h3>We are the Insanity-Crew, consisting of 4 engineers bla bla bla</h3>
        <div className="imagecontainer">
          <div className="infoContainer">
            <div className="circle">
              <img src={Jay} alt="Jay" width="200px" />
            </div>
            <button>
              {' '}
              <a href="https://www.linkedin.com/in/natalie-cordoves-211362185/">
                LinkedIn
              </a>
            </button>
            <button>
              <a href="https://github.com/ncordoves">Github</a>
            </button>
          </div>
          <div>
            <div className="circle">
              <img src={anna} alt="Anna" width="200px" />
            </div>
            <button>LinkedIn</button>
            <button>
              <a href="https://github.com/annamullike">Github</a>
            </button>
          </div>
          <div>
            <div className="circle">
              <img src={yining} alt="Yining" width="270px" />
            </div>
            <button>
              <a href="https://www.linkedin.com/in/yining-wang-83b896108/">
                LinkedIn
              </a>
            </button>
            <button>
              <a href="https://github.com/Yiningcw">GitHub</a>
            </button>
          </div>
          <div>
            <div className="circle">
              <img src={slava} alt="Slava" width="200px" />
            </div>
            <button>
              <a href="https://www.linkedin.com/in/slava-melikov-788b90229/">
                LinkedIn
              </a>
            </button>
            <button>
              <a href="https://github.com/Slavamelikov05">GitHub</a>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
