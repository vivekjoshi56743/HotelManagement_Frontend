import React from 'react'
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

export default function Rooms() {

    const location = useLocation();

    const navigate = useNavigate();
    const handleBookRoom = roomId => {
        // Handle booking logic for the selected room

        navigate('/userpage/book', { state: { roomId: roomId } });
    };
    const [rooms, setRooms] = useState([]);
    useEffect(() => {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        ;
        fetch('http://localhost:8080/room/hotel/' + String(location.state.hotelId), {
            method: 'GET',
            headers: headers,
        })
            .then(response => response.json())
            .then(data => {
                setRooms(data);
                console.log(data[0].hotel.name);
            })
            .catch(error => {
                console.log(error);
            });
    }, [])

    return (
        <>
        <button onClick={() => navigate(-1)} className="btn btn-link">
          <FiArrowLeft size={24} />
        </button>
        <div>
          <div className="card mb-4">
            <div className="card-header">
              <h3>Hotel Details</h3>
            </div>
            <div className="card-body">
              <h4 className="card-title">{rooms[0]?.hotel.name.toUpperCase()}</h4>
              <p className="card-text">Address: {rooms[0]?.hotel.address}</p>
              <p className="card-text">Phone Number: {rooms[0]?.hotel.phoneNumber}</p>
            </div>
          </div>
          <div className="row">
            {rooms.map((room) => (
              <div className="col-md-4" key={room.room_id}>
                <Card style={{ width: '100%',margin: '10px 5px' }}>
                  <Card.Body>
                    <h4>Room Number: {room.roomNumber}</h4>
                    <p>Price: ${room.price}</p>
                    <p>Capacity: {room.capacity}</p>
                    <p>Availability: {room.isAvailable ? 'Available' : 'Not Available'}</p>
                    <Button
                      variant="primary"
                      style={{ margin: '10px 0' }}
                      disabled={!room.isAvailable}
                      onClick={() => handleBookRoom(room.room_id)}
                    >
                      Book Room
                    </Button>
                  </Card.Body>
                </Card>
              </div>
            ))}
          </div>
        </div>
        
      </>
    )
}
