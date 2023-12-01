import { PrefetchContext } from 'context/prefetch';
import React from 'react';

function usePrefetchContext() {
    return React.useContext(PrefetchContext);
}

export default usePrefetchContext;
