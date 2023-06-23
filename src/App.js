import React from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './components/Login';
import AddHotes from './components/Admin/AddHotels';
import Userpage from './components/user/Userpage';
import Adminpage from './components/Admin/Adminpage';
import Hotels from './components/user/Hotels';
import Rooms from './components/user/Rooms';
import Bookings from './components/user/Bookings.js';
import Book from './components/user/Book';
import AdminHotels from './components/Admin/AdminHotels';
import AdminBookings from './components/Admin/AdminBookings';
import AdminRooms from './components/Admin/AdminRooms';
import AdminUsers from './components/Admin/AdminUsers';
import Register from './components/Register';
import AddRooms from './components/Admin/AddRooms';



export default function App() {


  return (
    <Router>

      <Routes>

        <Route path='/' element={<Login />} >
        </Route>

        <Route path='/userpage' element={<Userpage />}>
          <Route index element={<Hotels />} />
          <Route path='/userpage/hotels' element={<Hotels />} />
          <Route path='/userpage/rooms' element={<Rooms />} />
          <Route path='/userpage/bookings' element={<Bookings />} />
          <Route path ='/userpage/book' element={<Book/>} />
        </Route>

        <Route path='/adminpage' element={<Adminpage />}>
          <Route index element={<AdminHotels />} />
          <Route path='/adminpage/addhotels' element={<AddHotes />} />
          <Route path='/adminpage/hotels' element={<AdminHotels />} />
          <Route path='/adminpage/bookings' element={<AdminBookings />} />
          <Route path='/adminpage/rooms' element={<AdminRooms />} />
          <Route path='/adminpage/users' element={<AdminUsers />} />
          <Route path='/adminpage/addrooms' element={<AddRooms />} />

        </Route>
        <Route path='/register' element={<Register/>} />
        <Route path='*' element={<h1>404 not found</h1>} />
      </Routes>

    </Router>
  )
}
