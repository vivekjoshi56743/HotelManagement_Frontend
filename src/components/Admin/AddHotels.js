import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FiArrowLeft } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const AddHotels = () => {

    const navigate = useNavigate();
    const [name, setname] = useState('');
    const [address, setaddress] = useState('');
    const [phoneNumber, setphoneNumber] = useState('');

    const handleCreateHotel = (e) => {
        e.preventDefault();
        const confirm = window.confirm('Are you sure you want to add this hotel?');
        if (confirm) {
            const hotelData = {
                name: name,
                address: address,
                phoneNumber: phoneNumber
            };
            const userDataString = localStorage.getItem('userData');
            const userData = JSON.parse(userDataString);

            const username = userData.username;
            const password = userData.password;

            const headers = new Headers();
            headers.append('Content-Type', 'application/json');
            headers.append('Authorization', 'Basic ' + btoa(username + ':' + password));
            console.log(JSON.stringify(hotelData));
            fetch('http://localhost:8080/hotels', {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(hotelData)
            })
                //.then(response => response.json())
                .then(data => {
                    //console.log("ok");
                    //console.log(data.json()); // Assuming the API returns a response with a message
                    if (data.status === 200) {
                        console.log("hotel added");
                        toast.success("Hotel added successfully");
                        //setIsCreated(true);

                    }

                })
                .catch(error => {
                    console.log(error);
                    toast.error("Error adding hotel");
                });
        }
    }

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
                <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundImage: 'url("/images/background6.jpg")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                    <div className="border rounded p-4" style={{ width: '4.5in', height: '4in', backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
                        <h2 className="mb-4">Add Hotel</h2>
                        <form onSubmit={handleCreateHotel}>
                            <div className="mb-3">
                                <label htmlFor="hotelName" className="form-label">Hotel Name</label>
                                <input type="text"  onChange={(e) => setname(e.target.value)} className="form-control" id="hotelName" placeholder="Hotel Name" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="address" className="form-label">Address</label>
                                <input type="text" onChange={(e) => setaddress(e.target.value)}  className="form-control" id="address" placeholder="Address" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                                <input type="text" onChange={(e) => setphoneNumber(e.target.value)}  className="form-control" id="phoneNumber" placeholder="Phone Number" />
                            </div>
                            <button type="submit" className="btn btn-primary">Create Hotel</button>
                        </form>

                    </div>
                </div>
            </div>
            <ToastContainer />
        </>


    );
}

export default AddHotels;
