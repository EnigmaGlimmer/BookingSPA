import moment from 'moment';
import React from 'react';
import { Button, Col, Row, Table } from 'react-bootstrap';

import ReactPaginate from 'react-paginate';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import FilterBookingBox from '../../../components/filter/BookingFilterBox';
import useBookingFilter from '../../../hooks/useBookingFilter';

function AdminBooking() {
    const colStyle = {
        wordWrap: 'break-word',
        width: 'auto',
    };
    const {
        isAllSelected,
        hasAnySelected,
        unselectAllBooking,
        selectAllBooking,
        selectedBooking,
        selectBooking,
        handleCancelBooking,
        handleCancelByFilter,
        services,
        bookingTotal,
        parentServices,
        setPage,
        take,
        setOrderBy,
        setSearchBy,
        setKeyword,
        setOrderType,
    } = useBookingFilter();

    return (
        <section>
            <h3>Booking</h3>

            <div className="admin-booking-table-form">
                <FilterBookingBox
                    onFilterChange={(filterVal, type) => {
                        let matchSearch;

                        if (type.toLowerCase() === 'date') {
                            matchSearch = moment(filterVal, 'yyyy-MM-DD').format('DD/MM/yyyy');
                        } else if (type.toLowerCase() === 'month') {
                            matchSearch = moment(filterVal, 'yyyy-MM').format('MM/yyyy');
                        } else if (type.toLowerCase() === 'year') {
                            matchSearch = moment(filterVal, 'yyyy').format('yyyy');
                        }

                        setSearchBy(type);
                        setKeyword(matchSearch);
                    }}
                    onSearchChange={(keyword, type) => {
                        console.log(keyword, type);
                        setSearchBy(type);
                        setKeyword(keyword);
                    }}
                    onSortChange={(sortValue) => {
                        setOrderBy(sortValue);
                    }}
                    onSortTypeChange={(sortType) => {
                        setOrderType(sortType);
                    }}
                ></FilterBookingBox>
                {hasAnySelected() && (
                    <div className="mb-3">
                        <h3 className="mb-3">Actions</h3>

                        <Button
                            variant="outline"
                            className="btn-primary-outline"
                            onClick={() => {
                                handleCancelByFilter();
                            }}
                        >
                            Cancel By Filter
                        </Button>
                    </div>
                )}
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
                            <th style={colStyle} className="text-nowrap">
                                Check-in date
                            </th>
                            <th style={colStyle} className="text-nowrap">
                                Created date
                            </th>
                            <th style={colStyle} className="text-nowrap">
                                Booking Time
                            </th>
                            <th style={colStyle} className="text-nowrap">
                                Service - Name
                            </th>
                            <th style={colStyle}>Staff</th>
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
                                        <Row className="flex-nowrap">
                                            <Col>
                                                {parentServices?.find?.((s) => s.serviceId === booking?.serviceId)
                                                    ?.serviceName ||
                                                    services?.find?.((s) => s.serviceId === booking?.serviceId)
                                                        ?.serviceName}
                                                :
                                            </Col>
                                            <Col className="text-nowrap text-start">{booking?.serviceName}</Col>
                                        </Row>
                                    </td>
                                    <td className="text-nowrap">{booking?.staffs.map((s) => s.fullName).join(' ,')}</td>
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
