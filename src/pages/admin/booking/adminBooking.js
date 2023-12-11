import moment from 'moment';
import React from 'react';
import { Button, Table } from 'react-bootstrap';

import ReactPaginate from 'react-paginate';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import FilterBookingBox from '../../../components/filter/BookingFilterBox';
import useBookingFilter from '../../../hooks/useBookingFilter';

function AdminBooking() {
    const colStyle = {
        wordWrap: 'break-word',
        maxWidth: '100px',
    };
    const {
        isAllSelected,
        unselectAllBooking,
        selectAllBooking,
        selectedBooking,
        selectBooking,
        handleCancelBooking,
        services,
        bookingTotal,
        parentServices,
        setPage,
        take,
        orderBy,
        setOrderBy,
        searchBy,
        setSearchBy,
        keyword,
        setKeyword,
    } = useBookingFilter();

    return (
        <section>
            <h3>Booking</h3>

            <div className="admin-booking-table-form">
                <FilterBookingBox
                    onFilterChange={(filterVal, type) => {
                        const matchSearch = moment(filterVal, 'yyyy-MM-DD').format('dd/MM/yyyy');
                        // console.log(filterVal, type);
                        // console.log(matchSearch);
                        setSearchBy(type);
                        setKeyword(matchSearch);
                    }}
                    onSearchChange={(keyword, type) => {
                        setSearchBy(type);
                        setKeyword(keyword);
                    }}
                    onSortChange={(sortType) => {
                        setOrderBy(sortType);
                    }}
                ></FilterBookingBox>
                <div className="d-flex mb-3">
                    <Button variant="outline" className="btn-primary-outline" onClick={() => {}}>
                        Cancel By Filter
                    </Button>
                </div>
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
                                <input
                                    type="checkbox"
                                    checked={isAllSelected()}
                                    onChange={() => {
                                        if (isAllSelected()) {
                                            unselectAllBooking();
                                        } else selectAllBooking();
                                    }}
                                />
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
                        {selectedBooking?.map?.((booking, index) => {
                            return (
                                <tr key={index}>
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={booking.selected}
                                            onChange={() => selectBooking(booking.bookingId)}
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
