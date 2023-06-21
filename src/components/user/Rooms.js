import React from 'react'
import { useEffect,useState } from 'react';
export default function Rooms(props) {
    const [rooms, setRooms] = useState([]);
    useEffect(() => {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const id=props.id;
        fetch('http://localhost:8080/rooms/'+String(id), {
            method: 'GET',
            headers: headers,
        })
            .then(response => response.json())
            .then(data => {
                setRooms(data);

            })
            .catch(error => {
                console.log(error);
            });
    }, [])

    return (
    <div>
      
    </div>
  )
}
