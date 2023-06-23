import React from 'react'
import { Button, Card } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AdminHotels() {
    const [hotels, setHotels] = useState([]);

    const navigate = useNavigate();

    const handleLookRoom = (hotelId) => {

        navigate('/adminpage/rooms', { state: { hotelId: hotelId } });
    };
    const fetchHotels = () => {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');

        fetch('http://localhost:8080/hotels', {
            method: 'GET',
            headers: headers,
        })
            .then(response => response.json())
            .then(data => {
                setHotels(data);

            })
            .catch(error => {
                console.log(error);
            });

    }

    const handleDelete = (hotelId) => {

        const confirm = window.confirm("Are you sure you want to delete this hotel?");
        if (confirm) {

            const userData = JSON.parse(localStorage.getItem('userData'));
            const username = userData.username;
            const password = userData.password;

            const headers = new Headers();
            headers.append('Content-Type', 'application/json');
            headers.append('Authorization', 'Basic ' + btoa(username + ":" + password));

            fetch('http://localhost:8080/hotels/remove/' + String(hotelId), {
                method: 'DELETE',
                headers: headers,
            })
                .then(response => response.text())
                .then(data => {
                    if (data === "") {
                        toast.success("Hotel deleted");
                        //setIsCreated(true);
                        fetchHotels();
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
    };


    useEffect(() => {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');

        fetch('http://localhost:8080/hotels', {
            method: 'GET',
            headers: headers,
        })
            .then(response => response.json())
            .then(data => {
                setHotels(data);

            })
            .catch(error => {
                console.log(error);
            });
    }, [])



    return (
        <>

            <div className="row">
                {hotels.map(hotel => (
                    <div className="col-md-4" key={hotel.hotel_id}>
                        <Card style={{ width: '100%',margin: '10px 5px' }}>
                            <Card.Body>
                                <h4>Hotel Name: {hotel.name}</h4>
                                <p>Address: {hotel.address}</p>
                                <p>Phone: {hotel.phoneNumber}</p>

                                <Button
                                    variant="primary"
                                    style={{ margin: '10px 5px' }}
                                    onClick={() => handleLookRoom(hotel.hotel_id)}
                                >
                                    Look Rooms
                                </Button>
                                <Button
                                    variant="danger"
                                    style={{ margin: '10px 0' }}
                                    onClick={() => handleDelete(hotel.hotel_id)}
                                >
                                    Delete Hotel
                                </Button>
                            </Card.Body>
                        </Card>

                    </div>
                ))}

                <div className="col-md-4" >
                    <Card style={{ width: '100%',margin: '10px 5px' }}>
                        <Card.Body>
                            <h4>Hotel Name: </h4>
                            <p>Address: </p>
                            <p>Phone:</p>
                            <Button
                                variant="success"
                                style={{ margin: '10px 0' }}
                                onClick={() => navigate('/adminpage/addhotels')}
                            >
                                Add New Hotel
                            </Button>
                        </Card.Body>
                    </Card>

                </div>
            </div>


            <ToastContainer />
        </>
    )
}
