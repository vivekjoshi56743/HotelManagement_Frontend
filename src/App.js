import React from 'react'
import { BrowserRouter as Router, Route, Routes, Switch } from "react-router-dom";
import Login from './components/Login';
import AddHotes from './components/Admin/AddHotels';
import Userpage from './components/user/Userpage';
import Adminpage from './components/Admin/Adminpage';
import Hotels from './components/user/Hotels';
import Rooms from './components/user/Rooms';
import Bookings from './components/user/Bookings';



export default function App() {


  return (
    <Router>

      <Routes>

        <Route path='/' element={<Login />} >
        </Route>

        <Route path='/userpage' element={<Userpage />}>

          <Route path='/userpage/hotels' element={<Hotels />} />
          <Route path='/userpage/rooms' element={<Rooms />} />
          <Route path='/userpage/bookings' element={<Bookings />} />
        </Route>

        <Route path='/adminpage' element={<Adminpage />}>

          <Route path='/adminpage/addhotels' element={<AddHotes />} />

        </Route>


      </Routes>

    </Router>
  )
}
