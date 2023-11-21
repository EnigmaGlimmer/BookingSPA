import moment from 'moment';
import React from 'react';
import { Button, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getBookings, getService, putBooking } from '../../../store/actions';
import useService from '../../../hooks/useServices';
import ReactPaginate from 'react-paginate';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';

function AdminBooking() {
    const dispatch = useDispatch();
    const [take] = React.useState(10);
    const [page, setPage] = React.useState(1);

    const { bookings, bookingTotal } = useSelector((state) => {
        return {
            bookings: state.Booking.bookings,
            bookingTotal: state.Booking.total,
        };
    });

    const { services } = useService({
        request: {
            skip: 0,
            take: 100,
            flat: 1,
        },
    });
    const { services: parentServices } = useService({
        request: {
            skip: 0,
            take: 100,
            flat: 0,
        },
    });

    React.useEffect(() => {
        dispatch(
            getService({
                skip: 0,
                take: 100,
            }),
        );
    }, [dispatch]);

    React.useEffect(() => {
        dispatch(
            getBookings({
                skip: page,
                take,
            }),
        );
    }, [dispatch, take, page]);

    function handleCancelBooking(id, booking) {
        dispatch(putBooking(id, booking));
    }

    const colStyle = {
        wordWrap: 'break-word',
        maxWidth: '100px',
    };

    const [selectedBooking, setSelectedBooking] = React.useState([]);

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
                            <th>
                                <input type="checkbox" checked={selectedBooking.length === bookings.length} />
                            </th>
                            <th>ID</th>
                            <th style={colStyle}>Name</th>
                            <th style={colStyle}>Email</th>
                            <th style={colStyle}>Phone Number</th>
                            <th style={colStyle}>Check-in date</th>
                            <th style={colStyle}>Created date</th>
                            <th style={colStyle}>Booking Time</th>
                            <th style={colStyle}>Service - Name</th>
                            <th style={colStyle}>How to know us?</th>
                            <th style={colStyle}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings?.map?.((booking, index) => {
                            return (
                                <tr key={index}>
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={bookings.some((b) => b.bookingId === booking.bookingId)}
                                        />
                                    </td>
                                    <td>{booking?.bookingId}</td>
                                    <td>{booking?.customers?.[0]?.customerName}</td>
                                    <td>{booking?.customers?.[0]?.customerEmail}</td>
                                    <td>{booking?.customers?.[0]?.customerPhone}</td>
                                    <td className="text-nowrap">{moment(booking?.checkinDate).format('yyyy-MM-DD')}</td>
                                    <td className="text-nowrap">{moment(booking?.createdDate).format('yyyy-MM-DD')}</td>
                                    <td className="text-nowrap">
                                        {booking?.slot.start_Hour?.slice(0, 5)} - {booking?.slot.end_Hour?.slice(0, 5)}
                                    </td>
                                    <td>
                                        {parentServices?.find?.((s) => s.serviceId === booking?.serviceId)
                                            ?.serviceName ||
                                            services?.find?.((s) => s.serviceId === booking?.serviceId)?.serviceName}
                                        - {booking?.serviceName}
                                    </td>
                                    <td className="text-nowrap">{booking?.customers[0]?.howtoknow}</td>
                                    <td>
                                        <Button
                                            variant="outline"
                                            className="btn-primary-outline me-2"
                                            onClick={() =>
                                                handleCancelBooking(booking?.bookingId, {
                                                    ...booking,
                                                    isCancelled: true,
                                                })
                                            }
                                        >
                                            Cancel booking
                                        </Button>
                                        <Button variant="outline" className="btn-primary-outline" onClick={() => {}}>
                                            Cancel By Filter
                                        </Button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </div>

            <ReactPaginate
                previousLabel={<AiOutlineLeft></AiOutlineLeft>}
                nextLabel={<AiOutlineRight></AiOutlineRight>}
                pageCount={Math.ceil(bookingTotal / take)}
                onPageChange={({ selected }) => {
                    setPage(selected + 1);
                }}
                containerClassName={'pagination'}
                previousLinkClassName={'pagination-arrow-hover'}
                nextLinkClassName={'pagination-arrow-hover'}
                pageClassName="px-3"
                disabledClassName={'pagination__link--disabled'}
                activeClassName={'pagination-item-active'}
            ></ReactPaginate>
        </section>
    );
}

export default AdminBooking;
