import React from 'react'

import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

export default function AdminRooms() {

    const navigate = useNavigate();
    const location = useLocation();
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

    const fetchRooms = () => {

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
            })


    }

    const handleDelete = (roomId) => {

        const confirm = window.confirm("Are you sure you want to delete this hotel?");
        if (confirm) {

            const userData = JSON.parse(localStorage.getItem('userData'));
            const username = userData.username;
            const password = userData.password;

            const headers = new Headers();
            headers.append('Content-Type', 'application/json');
            headers.append('Authorization', 'Basic ' + btoa(username + ":" + password));

            fetch('http://localhost:8080/room/delete/' + String(roomId), {
                method: 'DELETE',
                headers: headers,
            })
                .then(response => response.text())
                .then(data => {
                    if (data === "") {
                        toast.success("Hotel deleted");
                        //setIsCreated(true);
                        fetchRooms();
                    }
                    else {
                        toast.success(data)
                    }
                }
                )
                .catch(error => {
                    console.log(error);

                });
        }
    }




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
                    {rooms.map(room => (
                        <div className="col-md-4" key={room.room_id}>
                            <Card style={{ width: '100%',margin: '10px 5px' }}>
                                <Card.Body>
                                    <h4>Room Number: {room.roomNumber}</h4>
                                    <p>Price: ${room.price}</p>
                                    <p>Capacity: {room.capacity}</p>
                                    {/* <p>Availability: {room.isAvailable ? 'Available' : 'Not Available'}</p> */}
                                    <Button
                                        variant="primary"
                                        style={{ margin: '10px 0' }}
                                        disabled={!room.isAvailable}
                                        onClick={() => handleDelete(room.room_id)}
                                    >
                                        Delete Room
                                    </Button>
                                </Card.Body>
                            </Card>
                        </div>
                    ))}

                    <div className="col-md-4" >
                        <Card style={{ width: '100%',margin: '10px 5px' }}>
                            <Card.Body>
                                <h4>Room Number: </h4>
                                <p>Price: </p>
                                <p>Capacity: </p>
                                <Button
                                    variant="success"
                                    style={{ margin: '10px 0' }}
                                    onClick={() => navigate('/adminpage/addrooms', { state: { hotelId: location.state.hotelId } })}
                                >
                                    Add New Room
                                </Button>
                            </Card.Body>
                        </Card>

                    </div>
                </div>
            </div>

            <ToastContainer />
        </>
    )
}
