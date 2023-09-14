import { toast } from 'react-toastify';
import { Pagination, ServiceDTO, getServiceList } from '../api';
import { useEffect, useState } from 'react';

type Props = {
    request: Pagination;
};

type Return = {
    services: ServiceDTO[];
};

const useService: (props: Props) => Return = (props) => {
    const [services, setServices] = useState<Array<ServiceDTO>>([]);

    useEffect(() => {
        getServiceList(props.request)
            .then((response) => {
                console.log(response);
                setServices(response || []);
            })
            .catch((error) => {
                toast.error(typeof error === 'string' ? error : 'Server Error', {
                    autoClose: 3000,
                });
            });
    }, []);

    return {
        services,
    };
};

export default useService;
