import React from 'react'
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Register() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    const registerData = {
      username: username,
      password: password
    };
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    fetch('http://localhost:8080/user/add', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(registerData)
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        toast.success('Registration successful. Please login to continue.');
      })
      .catch(error => {
        console.log(error);
        toast.error('Something went wrong. Please try again.');
      })
  }


  return (
    <>
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundImage: 'url("/images/background1.jpg")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="border rounded p-4" style={{ width: '4.5in', height: '4in', backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
        <h2 className="mb-4">Register</h2>
        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input type="text" className="form-control" id="username" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="submit" onSubmit={handleRegister} className="btn btn-primary">Register</button>
        </form>
        <p className="text-center mt-3">
          Already have an account? <NavLink to="/" className="text-secondary">Log in</NavLink>
        </p>
      </div>
    </div>
    <ToastContainer/>
    </>
  )
}
