import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');

  const navigate = useNavigate();
  const handelredirect = () => {
    console.log('redirecting');
    const userDataString = localStorage.getItem('userData');
    const user = JSON.parse(userDataString);
    console.log("parsed"+user.roles);
    if (user.roles === 'admin') {
      navigate('/adminpage');
    }
    else if (user.roles === 'user') {
      navigate('/userpage');
    }
    else {
      navigate('/');
    }
  }

  const handleLogout = () => {
    // Remove the user data from local storage
    localStorage.removeItem('userData');
  }
  const handleLogin = (e) => {
    e.preventDefault();
    const loginData = {
      username: username,
      password: password
    };
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    fetch('http://localhost:8080/login', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(loginData)
    })
      .then(response => response.json())
      .then(data => {
        const modifiedData = { ...data, password: password };
        localStorage.setItem('userData', JSON.stringify(modifiedData));
        console.log(data);
        // const userDataString = localStorage.getItem('userData');
        // const user = JSON.parse(userDataString);
        // if (user.role === 'admin') {
        //   window.location.herf = '/adminpage';
        // }
        // else if (user.role === 'user') {
        //   window.location.href = '/userpage';

        // }
        // else {
        //   window.location.href = '/';
        // }
        console.log('login success');
        handelredirect();
      })
      .catch(error => {
        console.log(error);
      });

      
  }



  return (
    <div>
      <h1>Log in</h1>
      <form onSubmit={handleLogin}>
        <input type="text" placeholder="Username" onChange={(e) => setusername(e.target.value)} />
        <input type="password" placeholder="Password" onChange={(e) => setpassword(e.target.value)} />
        <button type="submit" >Log in</button>
      </form>


      <button onClick={handleLogout}>Log out</button>


    </div>
  )
}
