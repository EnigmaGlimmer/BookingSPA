import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSettingList } from '../store/actions';

export function useContact() {
    const dispatch = useDispatch();

    const { contact } = useSelector((state) => {
        console.log(state);
        return {
            contact: state?.Setting?.setting?.content?.contact,
        };
    });

    React.useEffect(() => {
        dispatch(getSettingList('contact'));
    }, []);

    return contact;
}
