import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBookings, getService, putBooking } from '../store/actions';
import useService from './useServices';
import { deleteBookings } from 'api/booking';
import { toast } from 'react-toastify';

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
    const [orderType, setOrderType] = React.useState('asc');
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
        getBookingList();
    }, [dispatch, take, page, orderBy, searchBy, keyword, setKeyword, setSearchBy, orderType]);

    function getBookingList() {
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

        if (orderType) {
            query.orderType = orderType;
        }

        dispatch(getBookings(query));
    }

    function handleCancelBooking(id, booking) {
        dispatch(putBooking(id, booking));
    }

    function handleCancelByFilter() {
        let cancelBookingIds = selectedBooking.filter((b) => b.selected).map((b) => b.bookingId);

        deleteBookings(cancelBookingIds)
            .then(() => {
                toast.success(`Deleted ${cancelBookingIds.length} items`);
                setKeyword(null);
                setSearchBy(null);
            })
            .catch(() => {
                toast.error('Failed to delete');
            });
    }
    function selectAllBooking() {
        setSelectedBooking(bookings.map((b) => ({ ...b, selected: true })));
    }
    function unselectAllBooking() {
        if (bookings) {
            setSelectedBooking(bookings.map((b) => ({ ...b, selected: false })));
        }
    }
    function selectBooking(id) {
        setSelectedBooking((bookings) => {
            return bookings.map((b) => {
                let result = b.bookingId === id ? { ...b, selected: !b.selected } : b;

                return result;
            });
        });
    }
    function isAllSelected() {
        return !selectedBooking.some((b) => !b.selected);
    }
    function hasAnySelected() {
        return selectedBooking.some((b) => b.selected);
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
        hasAnySelected,
        handleCancelBooking,
        handleCancelByFilter,
        services,
        bookingTotal,
        parentServices,
        setPage,
        take,
        orderBy,
        setOrderBy,
        orderType,
        setOrderType,
        searchBy,
        setSearchBy,
        keyword,
        setKeyword,
    };
}

export default useBookingFilter;
