import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const userData = JSON.parse(localStorage.getItem('userData'));
      const username = userData.username;
      const password = userData.password;

      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', 'Basic ' + btoa(username + ":" + password));

      fetch('http://localhost:8080/bookings/all', {
        method: 'GET',
        headers: headers,
      })
        .then(response => response.json())
        .then(data => {
          setBookings(data);
        }
        )
        .catch(error => {
          console.log(error);

        });
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  const handleDeleteBooking = async (bookingId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this booking?');

    if (confirmDelete) {
      try {
        const userData = JSON.parse(localStorage.getItem('userData'));
        const username = userData.username;
        const password = userData.password;

        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Basic ' + btoa(username + ":" + password));
        fetch(`http://localhost:8080/bookings/delete/${bookingId}`, {
          method: 'DELETE',
          headers: headers
        })
          .then(response => {
            if (response.status === 200) {
              console.log("booking deleted");
              toast.success("Booking deleted");
              fetchBookings();
            }
            else {
              toast.error("Error deleting booking");
            }

          }).catch(error => {

            toast.error(String(error));
          });


      } catch (error) {
        console.error('Error deleting booking:', error);
      }
    }

  };

  return (
    <>
      <div className="container">
        <h1>All Bookings</h1>
        <div className="row">
          {bookings.map((booking) => (
            <div className="col-md-4 mb-4" key={booking.booking_id}>
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">{booking.room.hotel.name.toUpperCase()}</h4>
                  <p className="card-text">{booking.room.hotel.address}</p>
                  <h5 className="card-text">Username: {booking.user.username}</h5>
                  <p className="card-text">Room Number: {booking.room.roomNumber}</p>
                  <p className="card-text">Price: ${booking.room.price}</p>
                  <p className="card-text">Capacity: {booking.room.capacity}</p>
                  <p className="card-text">Start Date: {booking.startDate}</p>
                  <p className="card-text">End Date: {booking.endDate}</p>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDeleteBooking(booking.booking_id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
