import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');

  const navigate = useNavigate();
  const handelredirect = () => {
    console.log('redirecting');
    const userDataString = localStorage.getItem('userData');
    const user = JSON.parse(userDataString);
    console.log("parsed" + user.roles);
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
      .then(response => {
        if (response.status === 200) {
          toast.success('Login success');
          return response.json();
        }
        else if(response.status=== 400) {
          toast.error('Invalid username or password');
          throw new Error('Invalid username or password');
        }
        else {
          toast.error('Something went wrong. Please try again.');
          throw new Error('Something went wrong. Please try again.');
        }
      } )
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
    <>
    <div className="d-flex justify-content-center align-items-center vh-100"  style={{ backgroundImage: 'url("/images/background4.jpg")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="border rounded p-4" style={{ width: '4.5in', height: '4in' , backgroundColor: 'rgba(255, 255, 255, 0.8)'}}>
        <h2 className="mb-4">Log in</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input type="text" className="form-control" id="username" placeholder="Username" onChange={(e) => setusername(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" placeholder="Password" onChange={(e) => setpassword(e.target.value)} />
          </div>
          <button type="submit" className="btn btn-primary">Log in</button>
        </form>
        <p className="text-center mt-3">
          Don't have an account? <NavLink to="/register" className="text-secondary">Register</NavLink>
        </p>
      </div>
    </div>
    <ToastContainer />
    </>
  )
}
