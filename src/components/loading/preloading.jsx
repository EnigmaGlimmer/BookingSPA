import React from 'react';

function Preloading() {
    return (
        <div
            className="d-flex justify-content-center align-items-center w-100 h-100 position-fixed top-0 left-0"
            style={{ background: '#fff', color: '#010101' }}
        >
            Loading...
        </div>
    );
}

export default Preloading;
