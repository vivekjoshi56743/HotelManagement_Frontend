
import React from 'react'
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FiArrowLeft } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const Book = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const roomId = location.state.roomId;
        const userDataString = localStorage.getItem('userData');
        const userData = JSON.parse(userDataString);
        const userId = userData.userId;

        const bookingData = {
            room: { room_id: roomId },
            user: { userId: userId },
            startDate: startDate,
            endDate: endDate,
            isCancelled: false
        };


        const username = userData.username;
        const password = userData.password;

        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Basic ' + btoa(username + ':' + password));

        fetch('http://localhost:8080/bookings/add', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(bookingData),
        })
            .then(response => response.text())
            .then(data => {
                //console.log("ok");
                //console.log(data.json()); // Assuming the API returns a response with a message
                // if (data.status === 200) {
                //     console.log("hotel added");
                //     //setIsCreated(true);

                // }
                console.log(data);
                toast.success(data);

            }
            )
            .catch(error => {
                console.log(error);
                toast(String(error), {
                    type: "error",
                    duration: 3000,
                })
            }
            );


    }

    return (
        <>
            <div className="container">
                <div className="row justify-content-start">
                    <div className="col-1">
                        <button  onClick={() => navigate(-1)}
                            className="btn btn-link">
                            <FiArrowLeft size={24} />
                        </button>
                    </div>
                </div>
                <div className="row justify-content-center align-items-center vh-100" style={{ backgroundImage: 'url("/images/background2.jpg")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                    <div className="col-md-6">
                        <div className="card p-4">
                            <h2 className="mb-4">Booking Form</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="startDate" className="form-label">Start Date:</label>
                                    <input
                                        type="date"
                                        id="startDate"
                                        className="form-control"
                                        value={startDate}
                                        onChange={e => setStartDate(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="endDate" className="form-label">End Date:</label>
                                    <input
                                        type="date"
                                        id="endDate"
                                        className="form-control"
                                        value={endDate}
                                        onChange={e => setEndDate(e.target.value)}
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    )

}

export default Book;
