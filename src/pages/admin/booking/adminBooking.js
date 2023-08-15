import moment from 'moment';
import React from 'react';
import { Button, Table } from 'react-bootstrap';

function AdminBooking() {
    return (
        <section className="container">
            <h3>Booking</h3>

            <Table striped bordered hover size="sm" style={{ borderColor: 'var(--clr-border)' }}>
                <thead>
                    <th>ID</th>
                    <th>Email</th>
                    <th>Booking Date</th>
                    <th>Booking Time</th>
                    <th>Actions</th>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>
                            <img src="" alt=""></img>
                            usergmailtest@gmail.com
                        </td>
                        <td>{moment().format('MMMM DD, YYYY')}</td>
                        <td>08:00 - 9:12</td>
                        <td>
                            <Button variant="outline">Not available</Button>
                        </td>
                    </tr>
                </tbody>
            </Table>

            <></>
        </section>
    );
}

export default AdminBooking;
