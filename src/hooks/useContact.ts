import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSettingList } from '../store/actions';

interface Props {}

type Result = {
    phone: string;
    email: string;
    facebook: string;
    instagram: string;
    whatsapp: string;
};

export const useContact: (props?: Props) => Result = (props) => {
    const dispatch = useDispatch();

    const { contact } = useSelector((state: any) => {
        return {
            contact: state?.Setting?.setting?.content?.contact,
        };
    });

    React.useEffect(() => {
        dispatch(getSettingList('contact'));
    }, []);

    return contact;
};
