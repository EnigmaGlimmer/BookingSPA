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

    let value = {
        services,
    };

    return <PrefetchContext.Provider value={value}>{children}</PrefetchContext.Provider>;
}

export default PrefetchAdmin;
