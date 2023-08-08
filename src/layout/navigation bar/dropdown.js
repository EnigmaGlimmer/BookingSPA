import React from 'react';

// React Router Components
import { Link } from 'react-router-dom';

// Css
import './dropdown.css';

function DropdownMenu({ submenu, styleContainer, show = false }) {
    return (
        <ul id="nav-drop-down" data-display={show} style={styleContainer}>
            {submenu.map((item, key) => {
                return (
                    <li key={key}>
                        <Link to={item?.link}>
                            <span className="menu-link d-inline-block" data-active="false">
                                {item?.title}
                            </span>
                        </Link>
                    </li>
                );
            })}
        </ul>
    );
}

export default DropdownMenu;
