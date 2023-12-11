import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from 'store/user/action';
import * as api from 'api/auth';
import { toast } from 'react-toastify';

export default function useUserManagement() {
    const state = useSelector((r) => {
        return {
            staffs: r.User.staffs,
        };
    });

    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(actions.getStaffList());
    }, []);

    function addNewUser(userId) {
        api.getSingleStaff(userId)
            .then((response) => {
                dispatch(actions.addNewUser(response));
            })
            .catch((error) => {
                toast.error(error || 'Get user failed');
            });
    }

    return {
        ...state,
        addNewUser,
    };
}
