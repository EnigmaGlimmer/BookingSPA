import moment from 'moment';
import React from 'react';
import { Button, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBooking, getBookings } from '../../../store/actions';

function AdminBooking() {
    const dispatch = useDispatch();
    const { bookings } = useSelector((state) => {
        return {
            bookings: state.Booking.bookings,
        };
    });
    React.useEffect(() => {
        dispatch(getBookings());
    }, [dispatch]);
    const handleDeleteBooking = (id) => {
        dispatch(deleteBooking(id));
    };
    return (
        <section className="container">
            <h3>Booking</h3>

            <Table striped bordered hover size="sm" style={{ borderColor: 'var(--clr-border)' }}>
                <thead>
                    <th>ID</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                    <th>Booking Date</th>
                    <th>Booking Time</th>
                    <th>Actions</th>
                </thead>
                <tbody>
                    {(bookings || []).map((booking) => {
                        return (
                            <tr>
                                <td>{booking.bookingId}</td>
                                <td>{booking.customers[0].customerEmail}</td>
                                <td>{booking.customers[0].customerPhone}</td>
                                <td>{moment(booking.checkinDate).format('yyyy-MM-DD')}</td>
                                <td>
                                    {booking.slot.start_Hour.slice(0, 5)} - {booking.slot.end_Hour.slice(0, 5)}
                                </td>
                                <td>
                                    <Button variant="danger" onClick={handleDeleteBooking(booking.bookingId)}>
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>

            <></>
        </section>
    );
}

export default AdminBooking;
