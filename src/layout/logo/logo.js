import React from 'react';

import flower from '../../images/brand/flower.svg';

// css
import './logo.css';

function logo() {
    return (
        <article id="logo">
            <img src={flower} id="flower"></img>
        </article>
    );
}

export default logo;
