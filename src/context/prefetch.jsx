import useService from 'hooks/useServices';
import React from 'react';

export const PrefetchContext = React.createContext();

function PrefetchAdmin({ children }) {
    const { services } = useService({
        request: {
            skip: 0,
            take: 100,
        },
    });

    const { services: parentServices } = useService({
        request: {
            skip: 0,
            take: 100,
            flat: 0,
        },
    });
    const { services: childServices } = useService({
        request: {
            skip: 0,
            take: 100,
            flat: 1,
        },
    });

    let value = {
        services,
        parentServices,
        childServices,
    };

    return <PrefetchContext.Provider value={value}>{children}</PrefetchContext.Provider>;
}

export default PrefetchAdmin;
