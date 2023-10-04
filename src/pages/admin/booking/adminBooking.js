import moment from 'moment';
import React from 'react';
import { Button, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getBookings, getService, putBooking } from '../../../store/actions';
import useService from '../../../hooks/useServices';
import ReactPaginate from 'react-paginate';

function AdminBooking() {
    const dispatch = useDispatch();
    const { bookings } = useSelector((state) => {
        return {
            bookings: state.Booking.bookings,
        };
    });

    const { services } = useService({
        request: {
            skip: 0,
            take: 100,
            flat: 1,
        },
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

    function handleCancelBooking(id, booking) {
        // console.log(id, booking);
        dispatch(putBooking(id, booking));
    }

    const colStyle = {
        wordWrap: 'break-word',
        maxWidth: '100px',
    };

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
                        <tr>
                            <th>ID</th>
                            <th style={colStyle}>Email</th>
                            <th style={colStyle}>Phone Number</th>
                            <th style={colStyle}>Booking Date</th>
                            <th style={colStyle}>Booking Time</th>
                            <th style={colStyle}>Service</th>
                            <th style={colStyle}>How to know us?</th>
                            <th style={colStyle}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings?.map?.((booking, index) => {
                            return (
                                <tr key={index}>
                                    <td>{booking?.bookingId}</td>
                                    <td>{booking?.customers[0]?.customerEmail}</td>
                                    <td>{booking?.customers[0]?.customerPhone}</td>
                                    <td className="text-nowrap">{moment(booking?.checkinDate).format('yyyy-MM-DD')}</td>
                                    <td className="text-nowrap">
                                        {booking?.slot.start_Hour?.slice(0, 5)} - {booking?.slot.end_Hour?.slice(0, 5)}
                                    </td>
                                    <td>{services?.find?.((s) => s.serviceId === booking?.serviceId)?.serviceName}</td>
                                    <td className="text-nowrap">{booking?.customers[0]?.howtoknow}</td>
                                    <td>
                                        <Button
                                            variant="outline"
                                            className="btn-primary-outline"
                                            onClick={() =>
                                                handleCancelBooking(booking?.bookingId, {
                                                    ...booking,
                                                    isCancelled: true,
                                                })
                                            }
                                        >
                                            Cancel booking
                                        </Button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </div>

            {/* <ReactPaginate pageCount={5}></ReactPaginate> */}
        </section>
    );
}

export default AdminBooking;
