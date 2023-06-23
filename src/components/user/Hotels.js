import React, { useEffect, useState } from 'react'
import { Card, Button } from 'react-bootstrap';

import { useNavigate } from 'react-router-dom';

export default function Hotels() {
    const [hotels, setHotels] = useState([]);

    const navigate = useNavigate();

    const handleLook = (hotelId) => {
        // This function will be called when the "look" button is clicked.
        // It will pass the hotel id to the room component.
        // You can use the "useHistory" hook to navigate to the room component.

        navigate('/userpage/rooms', { state: { hotelId: hotelId } });

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
                                    style={{ margin: '10px 0' }}
                                    onClick={() => handleLook(hotel.hotel_id)}
                                >
                                    Look Rooms
                                </Button>
                                
                            </Card.Body>
                        </Card>

                    </div>
                ))}
            </div>

        </>
    )
}
