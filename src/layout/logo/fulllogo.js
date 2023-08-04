import React from 'react';

import flower from '../../images/brand/full-flower.svg';

// css
import './logo.css';

function FullLogo() {
    return (
        <article id="full-logo">
            <img src={flower} id="full-flower"></img>
        </article>
    );
}

export default FullLogo;
