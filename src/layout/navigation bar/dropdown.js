import React from 'react';

// React Router Components
import { Link } from 'react-router-dom';

// Css
import './dropdown.css';
import { Col, Row } from 'react-bootstrap';

function DropdownMenu({ submenu, styleContainer, show = false }) {
    return (
        <Row className="d-flex p-3" id="nav-drop-down" data-display={show} style={styleContainer}>
            {submenu.map((item, key) => {
                return (
                    <Col key={key} className="d-flex">
                        <span>
                            <Link to={item?.link}>
                                <h2 className="menu-link d-inline-block" data-active="false">
                                    {item?.title}
                                </h2>
                            </Link>
                            <ul>
                                {item?.childs?.map?.((c, id) => (
                                    <li key={id}>
                                        <Link to={c?.link}>
                                            <p>{c.title}</p>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </span>
                        {key < submenu.length - 1 && <span className="split-line"></span>}
                    </Col>
                );
            })}
        </Row>
    );
}

export default DropdownMenu;
