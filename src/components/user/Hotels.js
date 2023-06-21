import React, { useEffect, useState } from 'react'
import { Row, Col, Button } from 'react-bootstrap';



export default function Hotels() {
    const [hotels, setHotels] = useState([]);
    
    
    
    const handleLook = (hotelId) => {
        // This function will be called when the "look" button is clicked.
        // It will pass the hotel id to the room component.
        // You can use the "useHistory" hook to navigate to the room component.
        
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
        <div>
            <h1>Hotels</h1>
            <div>
                {hotels.map((hotel, index) => (
                    <Row key={index}>
                        <Col sm={6}>
                            <h2>{hotel.name}</h2>
                            <p>{hotel.address}</p>
                            <p>{hotel.phoneNumber}</p>
                        </Col>
                        <Col sm={6}>
                            <Button onClick={() => handleLook(hotel.hotel_id)}>Look</Button>
                        </Col>
                    </Row>
                ))}
            </div>
        </div>
        
        </>
    )
}
