import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FiArrowLeft } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
const AddRooms = () => {
    const navigate = useNavigate();
    const [roomNumber, setRoomNumber] = useState('');
    const [price, setPrice] = useState(0);
    const [capacity, setCapacity] = useState(0);
    const location = useLocation();

    const handleCreateRoom = (e) => {
        e.preventDefault();
        const confirm = window.confirm('Are you sure you want to add this room?');
        if (confirm) {
            const roomData = {
                hotel: {
                    hotel_id: location.state.hotelId
                },
                roomNumber: roomNumber,
                price: price,
                capacity: capacity
            };
            const userData = JSON.parse(localStorage.getItem('userData'));
            const username = userData.username;
            const password = userData.password;
            const headers = new Headers();
            console.log(JSON.stringify(roomData));
            headers.append('Content-Type', 'application/json');
            headers.append('Authorization', 'Basic ' + btoa(username + ':' + password));
            fetch('http://localhost:8080/room/add', {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(roomData)
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log('Room added successfully');
                    toast.success('Room added successfully');
                    // Handle success logic here
                })
                .catch((error) => {
                    console.log(error);
                    toast.error('Error adding room');
                    // Handle error logic here
                });
        }
    };

    return (
        <>
            <div className="container">
                <div className="row justify-content-start">
                    <div className="col-1">
                        <button onClick={() => navigate(-1)} className="btn btn-link">
                            <FiArrowLeft size={24} />
                        </button>
                    </div>
                </div>
                <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundImage: 'url("/images/background7.jpg")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                    <div className="border rounded p-4" style={{ width: '4.5in', height: '4in', backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
                        <h2 className="mb-4">Add Room</h2>
                        <form onSubmit={handleCreateRoom} >
                            <div className="mb-3">
                                <label htmlFor="roomNumber" className="form-label">
                                    Room Number
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="roomNumber"
                                    placeholder="Room Number"
                                    onChange={(e) => setRoomNumber(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="price" className="form-label">
                                    Price
                                </label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="price"
                                    placeholder="Price"
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="capacity" className="form-label">
                                    Capacity
                                </label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="capacity"
                                    placeholder="Capacity"
                                    onChange={(e) => setCapacity(e.target.value)}
                                />
                            </div>

                            <button type="submit" className="btn btn-primary">
                                Create Room
                            </button>
                        </form>

                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    );
};

export default AddRooms;

