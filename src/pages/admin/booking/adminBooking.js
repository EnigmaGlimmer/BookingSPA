import moment from 'moment';
import React from 'react';
import { Button, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getBookings, getService } from '../../../store/actions';

function AdminBooking() {
    const dispatch = useDispatch();
    const { bookings } = useSelector((state) => {
        return {
            bookings: state.Booking.bookings,
        };
    });
    const { services } = useSelector((state) => {
        return {
            services: state.Service.services,
        };
    });
    React.useEffect(() => {
        dispatch(getBookings());
        dispatch(
            getService({
                skip: 0,
                take: 100,
            }),
        );
    }, [dispatch]);
    return (
        <section>
            <h3>Booking</h3>
            <div className="admin-booking-table-form">
                <Table
                    striped
                    bordered
                    hover
                    className="admin-booking-table"
                    style={{ borderColor: 'var(--clr-border)' }}
                >
                    <thead>
                        <th>ID</th>
                        <th>Email</th>
                        <th>Phone Number</th>
                        <th>Booking Date</th>
                        <th>Booking Time</th>
                        <th>Service</th>
                        <th>Action</th>
                    </thead>
                    <tbody>
                        {(bookings || [])?.map((booking, index) => {
                            return (
                                <tr key={index}>
                                    <td>{booking?.bookingId}</td>
                                    <td>{booking?.customers[0]?.customerEmail}</td>
                                    <td>{booking?.customers[0]?.customerPhone}</td>
                                    <td>{moment(booking?.checkinDate).format('yyyy-MM-DD')}</td>
                                    <td>
                                        {booking?.slot.start_Hour?.slice(0, 5)} - {booking?.slot.end_Hour?.slice(0, 5)}
                                    </td>
                                    <td>{services?.find((e) => e.serviceId === booking.serviceId)?.serviceName}</td>
                                    <td>
                                        <Button variant="danger">Delete</Button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </div>
            <></>
        </section>
    );
}

export default AdminBooking;
