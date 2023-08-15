import React from 'react';

import flower from '../../images/brand/offcanvaslogo.svg';

// css
import './logo.css';

function OffCanvasLogo() {
    return (
        <article id="logo" style={{ display: 'inline-block' }}>
            <img src={flower} id="flower"></img>
        </article>
    );
}

export default OffCanvasLogo;
