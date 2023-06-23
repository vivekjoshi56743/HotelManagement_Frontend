import React from 'react'
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
export default function AdminNav() {

  const userData = JSON.parse(localStorage.getItem('userData'));
  const navigate = useNavigate();
  const handelLogout = () => {
    localStorage.removeItem('userData');
    navigate('/');
  }
  return (
    <div>
      <>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <NavLink className="navbar-brand" to="#">Hotel Boooking</NavLink>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink className="nav-link active" aria-current="page" to='/adminpage/hotels'>Hotels</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/adminpage/bookings">Bookings</NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className="nav-link" to="/adminpage/users">Users</NavLink>
                </li>
              </ul>
              <button className="btn btn-outline-success me-2" type="submit">
                <FaUser /> {userData.username}
              </button>
              <button className="btn btn-outline-success" onClick={handelLogout} type="submit">Logout</button>
            </div>
          </div>
        </nav>
      </>
    </div>
  )
}
