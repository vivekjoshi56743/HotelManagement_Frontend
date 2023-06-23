import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AdminUsers() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const deleteUser = (userId) => {
        const confirmed = window.confirm('Are you sure you want to delete this user?');
        if (confirmed) {
            // Perform the delete operation here
            // You can use the `userId` parameter to delete the user
            const Userdata = JSON.parse(localStorage.getItem('userData'));
            const username = Userdata.username;
            const password = Userdata.password;

            const headers = new Headers();
            headers.append('Content-Type', 'application/json');
            headers.append('Authorization', 'Basic ' + btoa(username + ':' + password));
            fetch('http://localhost:8080/user/delete/' + String(userId), {
                method: 'DELETE',
                headers: headers,
            })
                .then((response) => response.text())
                .then((data) => {
                    
                    toast.success(data);
                    fetchUsers();
                })
                .catch((error) => {
                    console.log(error);
                    toast.error('Error deleting user');
                });
        }
    };

    const fetchUsers = () => {
        const Userdata = JSON.parse(localStorage.getItem('userData'));
        const username = Userdata.username;
        const password = Userdata.password;

        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', 'Basic ' + btoa(username + ':' + password));

        fetch('http://localhost:8080/user', {
            method: 'GET',
            headers: headers,
        })
            .then((response) => response.json())
            .then((data) => {
                setUsers(data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <>
            <div className="container">
                <Table striped bordered hover>
                    <thead className="thead-dark">
                        <tr>
                            <th>User ID</th>
                            <th>Username</th>
                            <th>Roles</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.userId}>
                                <td>{user.userId}</td>
                                <td>{user.username}</td>
                                <td>{user.roles}</td>
                                <td>
                                    <Button
                                        onClick={() => deleteUser(user.userId)}
                                        variant="danger"
                                    >
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
            <ToastContainer />
        </>
    );
}
