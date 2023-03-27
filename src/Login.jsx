import React, {useState, useEffect} from 'react'
import Navbar from "./Navbar"
import "./assets/styles.scss"
import axios from 'axios'
function Login() {
    const [inputPassword, setInputPassword] = useState("");
    const [inputUsername, setInputUsername] = useState("");
    const [loggedIn, setLoggedIn] = useState(false)
    async function checkLogin() {
      try {
        await axios.post("https://localhost:5001/", {
        username: inputUsername,
        password: inputPassword
      });
      setLoggedIn(true) //do we need a conditional here? try testing
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
              placeholder = 'Username'
              username={inputUsername}
              onChange={(e) => {
                setInputUsername(e.target.value);
              }} />
            <input               
              type="text"
              name="password"
              placeholder = 'Password'
              password={inputPassword}
              onChange={(e) => {
                setInputPassword(e.target.value);
              }} />
            </div>
            <button type='submit'>Login</button>
        </form>
        </div>
    </div>
  )
}

export default Login