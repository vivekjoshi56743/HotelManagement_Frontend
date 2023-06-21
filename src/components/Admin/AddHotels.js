import React, { useState } from 'react';

const AddHotels = () => {
    const [name, setname] = useState('');
    const [address, setaddress] = useState('');
    const [phoneNumber, setphoneNumber] = useState('');

    const handleCreateHotel = (e) => {
        e.preventDefault();

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
                    //setIsCreated(true);

                }

            })
            .catch(error => {
                console.log(error);
            });
    }

    return (
        <div>
            <h2>Create Hotel</h2>
            <form onSubmit={handleCreateHotel}>
                <input type="text" placeholder="Hotel Name" onChange={(e) => setname(e.target.value)} />
                <input type="text" placeholder="address" onChange={(e) => setaddress(e.target.value)} />
                <input type="text" placeholder="Phone Number" onChange={(e) => setphoneNumber(e.target.value)} />
                <button type="submit">Create Hotel</button>
            </form>
        </div>
    );
}

export default AddHotels;
