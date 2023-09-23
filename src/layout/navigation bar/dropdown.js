import React from 'react';

// React Router Components
import { Link } from 'react-router-dom';

// Css
import './dropdown.css';
import { Col, Row } from 'react-bootstrap';

function DropdownMenu({ submenu, styleContainer, show = false }) {
    return (
        <Row className="d-flex py-3 px-2" id="nav-drop-down" data-display={show} style={styleContainer}>
            {submenu.map((item, key) => {
                return (
                    <Col xs="12" md={12 / submenu.length} key={key} className="d-flex w-auto">
                        <span>
                            <h2 className="menu-link d-inline-block" data-active="false">
                                <Link to={item?.link} className="link-text">
                                    {item?.title}
                                </Link>
                            </h2>
                            <ul>
                                {item?.childs?.map?.((c, id) => (
                                    <li key={id}>
                                        <Link to={c?.link} className="link-text">
                                            <>{c.title}</>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </span>
                        {key < submenu.length - 1 && <span className="split-line ms-3"></span>}
                    </Col>
                );
            })}
        </Row>
    );
}

export default DropdownMenu;
