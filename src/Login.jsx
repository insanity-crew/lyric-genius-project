import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import Navbar from "./Navbar";
import "./assets/styles.scss";
import axios from 'axios';
import Cookies from 'js-cookie';

function Login() {
    const [inputPassword, setInputPassword] = useState("");
    const [inputEmail, setInputEmail] = useState("");
    const [loggedIn, setLoggedIn] = useState(false)
    async function checkLogin(event) {
      event.preventDefault()
      try {
      const res = await axios.post("http://localhost:5001/users/login", {email: inputEmail, password: inputPassword}, {withCredentials: true})
      const loginStatus = Cookies.get('loggedIn')
      if (res.data.verified) {
        setLoggedIn(true);
        console.log("correct input")
        window.location.href = "http://localhost:3000/play";
      } else {
        console.log("incorrect")
      }
    } catch (err) {
      console.error("Error: ", err);
    }
  }
  return (
    <div>
        <Navbar/>
        <h1>Login</h1>
        <div className = 'loginPage'>
        <form onSubmit={checkLogin} >
            <div className ="inputs">
            <input               
              type="text"
              name="username"
              placeholder = 'Email'
              email={inputEmail}
              onChange={(e) => {
                setInputEmail(e.target.value);
              }} />
            <input               
              type="password"
              name="password"
              placeholder = 'Password'
              password={inputPassword}
              onChange={(e) => {
                setInputPassword(e.target.value);
              }} />
            </div>
            <button type='submit'>Login</button>
        </form>
        <form>
          <h3>Don't have an account? Sign up now</h3>
          <button><Link to = '/signup'>Sign Up</Link></button>
        </form>
        </div>
    </div>
  )
}

export default Login