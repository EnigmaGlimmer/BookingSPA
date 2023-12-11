import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBookings, getService, putBooking, deleteManyBookings } from '../store/actions';
import useService from './useServices';

function useBookingFilter() {
    const dispatch = useDispatch();

    const state = useSelector((state) => {
        return {
            bookings: state.Booking.bookings,
            bookingTotal: state.Booking.total,
        };
    });

    const { bookings, bookingTotal } = state;
    const [take] = React.useState(10);
    const [page, setPage] = React.useState(1);
    const [orderBy, setOrderBy] = React.useState(null);
    const [searchBy, setSearchBy] = React.useState(null);
    const [keyword, setKeyword] = React.useState(null);

    const [selectedBooking, setSelectedBooking] = React.useState([]);

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
        let query = {
            skip: page,
            take,
        };

        if (orderBy) {
            query.orderBy = orderBy;
        }

        if (keyword && searchBy) {
            query.keyword = keyword;
            query.searchBy = searchBy;
        }

        dispatch(getBookings(query));
    }, [dispatch, take, page, orderBy, searchBy, keyword]);

    function handleCancelBooking(id, booking) {
        dispatch(putBooking(id, booking));
    }

    function handleCancelByFilter() {
        dispatch(deleteManyBookings(selectedBooking.filter((b) => b.selected).map((b) => b.bookingId)));
    }
    function selectAllBooking() {
        setSelectedBooking(bookings.map((b) => ({ ...b, selected: true })));
    }
    function unselectAllBooking() {
        setSelectedBooking(bookings.map((b) => ({ ...b, selected: false })));
    }
    function selectBooking(id) {
        setSelectedBooking((b) => (b.bookingId === id ? { ...b, selected: !b.selected } : b));
    }
    function isAllSelected() {
        return !selectedBooking.some((b) => !b.selected);
    }

    React.useEffect(() => {
        unselectAllBooking();
    }, [bookings]);

    return {
        ...state,
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
    };
}

export default useBookingFilter;
